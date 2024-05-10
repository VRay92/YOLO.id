import { Request, Response } from 'express';
import prisma from '@/prisma';
import { Prisma, STATUS } from '@prisma/client';
import { generateQRCode } from '@/utils/qrCodeGenerator';
import snap from '@/lib/midtransConfig';
import { format } from 'date-fns';

export class CustomerController {
  async buyTicket(req: Request, res: Response) {
    try {
      const {
        eventId,
        quantity,
        ticketTypeId,
        usePoints,
        useVoucher,
        voucherCode,
      } = req.body;
      const userId = res.locals.user.id;

      // Cari event berdasarkan eventId
      const event = await prisma.event.findUnique({
        where: { id: eventId },
        include: {
          ticketTypes: {
            where: { ticketTypeId },
          },
        },
      });

      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      const ticketType = event.ticketTypes[0];

      if (!ticketType) {
        return res.status(400).json({ message: 'Invalid ticket type' });
      }

      const totalPrice = Number(ticketType.price) * quantity;

      let discountAmount = 0;
      let userVoucherId: number | undefined;

      if (useVoucher && voucherCode) {
        // Cari voucher berdasarkan kode
        const voucher = await prisma.userVoucher.findFirst({
          where: {
            user: { id: userId },
            expiresAt: { gte: new Date() },
          },
        });

        if (voucher) {
          discountAmount += (totalPrice * voucher.discount) / 100;
          userVoucherId = voucher.id;
        } else {
          return res
            .status(400)
            .json({ message: 'Invalid or expired voucher code' });
        }
      }

      if (usePoints) {
        // Cari poin pengguna yang belum kadaluarsa
        const userPoints = await prisma.userPoint.findMany({
          where: {
            user: { id: userId },
            expiresAt: { gte: new Date() },
          },
          orderBy: { expiresAt: 'asc' },
        });

        let remainingPoints = totalPrice;

        for (const userPoint of userPoints) {
          if (remainingPoints <= 0) {
            break;
          }

          const pointsToUse = Math.min(userPoint.points, remainingPoints);
          discountAmount += pointsToUse;
          remainingPoints -= pointsToUse;

          await prisma.userPoint.update({
            where: { id: userPoint.id },
            data: { points: userPoint.points - pointsToUse },
          });
        }
      }

      const finalPrice = totalPrice - discountAmount;

      // Generate receipt URL (QR code)
      const receiptUrl = await generateQRCode();

      // Buat transaksi baru
      const transactionData: Prisma.TransactionUncheckedCreateInput = {
        userId,
        eventId,
        quantity,
        totalPrice,
        discountAmount,
        status: 'pending',
        receiptUrl,
      };

      if (userVoucherId) {
        transactionData.userVoucherId = userVoucherId;
      }

      const transaction = await prisma.transaction.create({
        data: transactionData,
      });

      // Midtrans payment gateway
      const midtransTransaction = await snap.createTransaction({
        transaction_details: {
          order_id: transaction.id.toString(),
          gross_amount: transaction.totalPrice.toNumber(),
        },
        customer_details: {
          email: userId.email,
          first_name: userId.username,
        },
      });

      return res.status(201).json({
        message: 'Ticket purchased successfully',
        data: { transaction, midtransToken: midtransTransaction.token },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
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

  async completePayment(req: Request, res: Response) {
    try {
      const { order_id, transaction_status } = req.body;

      // Verifikasi notifikasi pembayaran
      const isValid = await snap.transaction.notification(req.body);

      if (!isValid) {
        return res
          .status(400)
          .json({ message: 'Invalid Midtrans notification' });
      }
      //Cari transaksi dari order id
      const transaction = await prisma.transaction.findFirst({
        where: { id: parseInt(order_id) },
      });

      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }

      // Perbarui status transaksi dari midtrans
      let updateStatus: STATUS;

      if (
        transaction_status === 'capture' ||
        transaction_status === 'settlement'
      ) {
        updateStatus = 'paid';
      } else if (
        transaction_status === 'deny' ||
        transaction_status === 'cancel' ||
        transaction_status === 'expire'
      ) {
        updateStatus = 'cancelled';
      } else {
        return res.status(400).json({ message: 'Invalid payment status' });
      }

      await prisma.transaction.update({
        where: { id: transaction.id },
        data: { status: updateStatus },
      });

      return res
        .status(200)
        .json({ message: 'Payment status updated successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getCustomerById(req: Request, res: Response) {
    try {
      const userId = res.locals.user.id;

      const customer = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          username: true,
          email: true,
          age: true,
          gender: true,
        },
      });

      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }

      return res.status(200).json({ data: customer });
    } catch (error) {
      console.error('Error getting customer:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateCustomerById(req: Request, res: Response) {
    try {
      const userId = res.locals.user.id;
      const { username, email, age, gender } = req.body;

      const updatedCustomer = await prisma.user.update({
        where: { id: userId },
        data: {
          username,
          email,
          age,
          gender,
        },
      });

      return res.status(200).json({ data: updatedCustomer });
    } catch (error) {
      console.error('Error updating customer:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getCustomerVoucherById(req: Request, res: Response) {
    try {
      const userId = res.locals.user.id;

      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          voucher: {
            select: {
              id: true,
              discount: true,
              expiresAt: true,
            },
          },
          points: {
            select: {
              id: true,
              points: true,
              expiresAt: true,
            },
          },
        },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const { referralCode, voucher, points } = user;

      const formattedVoucher = voucher.map((v) => ({
        ...v,
        expiresAt: format(v.expiresAt, 'dd MMMM yyyy'),
      }));

      const formattedPoints = points.map((p) => ({
        ...p,
        expiresAt: format(p.expiresAt, 'dd MMMM yyyy'),
      }));

      res.status(200).json({
        referralCode,
        voucher: formattedVoucher,
        points: formattedPoints,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
