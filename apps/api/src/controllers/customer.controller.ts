import { Request, Response } from 'express';
import prisma from '@/prisma';
import { Prisma, STATUS } from '@prisma/client';
import { generateQRCode } from '@/utils/qrCodeGenerator';
import snap from '@/lib/midtransConfig';
import { format } from 'date-fns';

export class CustomerController {
  async getCustomerById(req: Request, res: Response) {
    try {
      const userId = res.locals.user.id;
      console.log("userid", userId)
      const customer = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          username: true,
          email: true,
          age: true,
          gender: true,
          imageProfile: true,
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
            where: { isUsed: false },
            select: { id: true, discount: true, expiresAt: true },
          },
          points: {
            where: { isUsed: false },
            select: { id: true, points: true, expiresAt: true },
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

  async getCustomerPurchasedEventByUserId(req: Request, res: Response) {
    interface EventTicketCount {
      [key: number]: number;
    }
    try {
      // First query: Get all transactions for the given userId
      const userId = res.locals.user.id;
      console.log("userId", userId);

      const transactions = await prisma.transaction.findMany({
        where: {
          userId: userId,
        },
        select: {
          eventId: true,
          status: true, // Include the status field
        },
      });
      console.log("transactions", transactions);

      // Group transactions by eventId and count tickets
      const eventTicketCount: EventTicketCount = transactions.reduce((acc, transaction) => {
        acc[transaction.eventId] = (acc[transaction.eventId] || 0) + 1;
        return acc;
      }, {} as { [key: string]: number },
      );

      // Extract unique eventIds and convert them to numbers
      const eventIds = Object.keys(eventTicketCount).map(id => Number(id));

      if (eventIds.length === 0) {
        return res.json([]); // No events found for the user
      }

      // Second query: Get events by eventIds
      const events = await prisma.event.findMany({
        where: {
          id: {
            in: eventIds, // Use the extracted unique eventIds
          },
        },
      });
      console.log("events", events);

      // Combine events with their ticket counts and status
      const eventsWithTicketCountsAndStatus = events.map(event => ({
        ...event,
        ticketCount: eventTicketCount[event.id],
        status: transactions.find(t => t.eventId === event.id)?.status || null,
      }));

      return res.json(eventsWithTicketCountsAndStatus);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
