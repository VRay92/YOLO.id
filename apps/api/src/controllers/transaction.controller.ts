import { Request, Response } from 'express';
import prisma from '@/prisma';
import { STATUS } from '@prisma/client';
import { generateQRCode } from '@/utils/qrCodeGenerator';
import snap from '@/lib/midtransConfig';
import { initiatePayment } from '@/utils/midtrans';
import { TicketType } from '@/types/transaction.type';

export class TransactionController {
  async createTransaction(req: Request, res: Response) {
    try {
      const {
        eventId,
        ticketTypes,
        useVoucher,
        voucherId,
        usePoints,
        pointsToUse,
      } = req.body;
      const userId = res.locals.user.id;

      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) return res.status(404).json({ message: 'User not found' });

      const event = await prisma.event.findUnique({
        where: { id: eventId },
        include: { ticketTypes: true },
      });
      if (!event) return res.status(404).json({ message: 'Event not found' });

      const selectedTicketTypes = ticketTypes.map((ticketType: any) => ({
        ticketTypeId: ticketType.id,
        quantity: ticketType.quantity,
      }));

      const totalPrice = selectedTicketTypes.reduce(
        (total: number, ticketType: TicketType) => {
          const price =
            event.ticketTypes.find(
              (t) => t.ticketTypeId === ticketType.ticketTypeId,
            )?.price || 0;
          return total + parseFloat(price.toString()) * ticketType.quantity;
        },
        0,
      );

      let discountAmount = 0;
      if (useVoucher && voucherId) {
        const voucher = await prisma.userVoucher.findUnique({
          where: {
            id: voucherId,
            userId,
            expiresAt: { gte: new Date() },
            isUsed: false,
          },
        });
        if (!voucher)
          return res
            .status(400)
            .json({ message: 'Invalid or expired voucher' });
        discountAmount = (totalPrice * voucher.discount) / 100;
        await prisma.userVoucher.update({
          where: { id: voucherId },
          data: { isUsed: true },
        });
      }

      if (usePoints && pointsToUse > 0) {
        const userPoints = await prisma.userPoint.findMany({
          where: { userId, isUsed: false, expiresAt: { gte: new Date() } },
          orderBy: { expiresAt: 'asc' },
        });
        let pointsConsumed = 0;
        for (const point of userPoints) {
          if (pointsConsumed + point.points <= pointsToUse) {
            pointsConsumed += point.points;
            await prisma.userPoint.update({
              where: { id: point.id },
              data: { isUsed: true },
            });
          } else {
            break;
          }
        }
        if (pointsConsumed < pointsToUse)
          return res.status(400).json({ message: 'Insufficient points' });
        discountAmount += pointsConsumed;
      }

      const finalPrice = totalPrice - discountAmount;

      const receiptUrl = await generateQRCode();

      const transaction = await prisma.$transaction(async (prisma) => {
        const createdTransaction = await prisma.transaction.create({
          data: {
            userId,
            eventId,
            quantity: selectedTicketTypes.reduce(
              (total: number, ticketType: TicketType) =>
                total + ticketType.quantity,
              0,
            ),
            totalPrice: parseFloat(totalPrice.toString()),
            discountAmount: parseFloat(discountAmount.toString()),
            status: finalPrice === 0 ? 'success' : 'pending',
            receiptUrl,
          },
        });

        for (const ticketType of selectedTicketTypes) {
          await prisma.eventTicketType.update({
            where: {
              eventId_ticketTypeId: {
                eventId: eventId,
                ticketTypeId: ticketType.ticketTypeId,
              },
            },
            data: { quantity: { decrement: ticketType.quantity } },
          });
        }
        return createdTransaction;
      });

      console.log('Transaction:', transaction); // Tambahkan log untuk memverifikasi transaksi

      if (transaction) {
        if (finalPrice === 0) {
          // Transaksi gratis, tidak memerlukan Midtrans
          return res.status(201).json({
            message: 'Transaction created successfully for free event',
            data: transaction,
          });
        } else {
          // Transaksi berbayar, menggunakan Midtrans
          const paymentResponse = await initiatePayment(
            transaction.id.toString(),
            finalPrice,
          );
          if (paymentResponse.token) {
            return res.status(201).json({
              message: 'Transaction created and payment initiated successfully',
              data: transaction,
              token: paymentResponse.token,
            });
          } else {
            throw new Error('Failed to obtain payment token');
          }
        }
      }
    } catch (error: any) {
      console.error('Error:', error);
      return res
        .status(500)
        .json({ message: 'Internal server error', error: error.message });
    }
  }

  async handleMidtransNotification(req: Request, res: Response) {
    try {
      const notification = req.body;
      const { order_id, transaction_status, fraud_status } = notification;

      // Dapatkan transaksi berdasarkan order_id dari database
      const transaction = await prisma.transaction.findUnique({
        where: { id: parseInt(order_id) },
      });

      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }

      // Update status transaksi berdasarkan status dari Midtrans
      let updatedStatus: STATUS = STATUS.pending;
      if (transaction_status === 'settlement') {
        updatedStatus = STATUS.success;
      } else if (
        transaction_status === 'cancel' ||
        transaction_status === 'expire' ||
        fraud_status === 'deny'
      ) {
        updatedStatus = STATUS.cancelled;
      }

      await prisma.transaction.update({
        where: { id: parseInt(order_id) },
        data: { status: updatedStatus },
      });

      return res.status(200).json({ message: 'Transaction status updated' });
    } catch (error) {
      console.error('Error:', error);
      return res
        .status(500)
        .json({
          message: 'Internal server error',
          error: (error as Error).message,
        });
    }
  }

  async claimVoucher(req: Request, res: Response) {
    try {
      const { eventId, voucherCode } = req.body;
      const userId = res.locals.user.id;

      // Cari event berdasarkan eventId
      const event = await prisma.event.findUnique({
        where: { id: eventId },
        include: {
          promotion: {
            where: {
              code: voucherCode,
              expiryDate: { gte: new Date() },
            },
          },
        },
      });

      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      const promotion = event.promotion[0];

      if (!promotion) {
        return res.status(400).json({ message: 'Invalid voucher code' });
      }

      // Cari apakah user sudah mengklaim voucher ini sebelumnya
      const existingUserVoucher = await prisma.userVoucher.findFirst({
        where: {
          userId,
          id: promotion.id,
        },
      });

      if (existingUserVoucher) {
        return res.status(400).json({ message: 'Voucher already claimed' });
      }

      // Buat user voucher baru
      const userVoucher = await prisma.userVoucher.create({
        data: {
          userId,
          discount: promotion.discount,
          expiresAt: promotion.expiryDate,
        },
      });

      return res
        .status(201)
        .json({ message: 'Voucher claimed successfully', data: userVoucher });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
