import { Request, Response } from 'express';
import prisma from '@/prisma';
import { STATUS } from '@prisma/client';
import { getLastEventId, getUniqueEvent } from '@/services/auth';
import { Prisma } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';
import { Bounce, toast } from 'react-toastify';
import { calculateAge, getAgeGroup } from '@/utils/customerDemographic';

export class OrganizerController {
  async createEvent(req: Request, res: Response) {
    try {
      const lastEventId = await getLastEventId();
      const { tickets, ...eventData } = req.body;
      console.log(req.file);
      console.log(tickets);
      // Check if req.files is an array
      if (Array.isArray(req.files)) {
        // If it's an array, access the fieldname of the first file
        console.log('ssssssssssss', req.files[0].filename);
        const imageUrl = `event/${req.files[0].filename}`;
        console.log(Object.values(req.body));
        console.log(imageUrl);
        const inputDataEvent = { ...eventData, imageUrl: imageUrl };
        console.log('input data', inputDataEvent);
        console.log('imageUrL', imageUrl);
        if (Object.values(inputDataEvent).includes('')) {
          toast.error('fill in all form', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            transition: Bounce,
          });
          throw new Error('Fill in all form');
        } else {
          inputDataEvent.cityId = parseInt(req.body.cityId);
          inputDataEvent.availableSeats = parseInt(req.body.availableSeats);
          inputDataEvent.startDate = new Date(req.body.startDate);
          inputDataEvent.endDate = new Date(req.body.endDate);
          inputDataEvent.isFree === 'true'
            ? (inputDataEvent.isFree = true)
            : (inputDataEvent.isFree = false);
          inputDataEvent.maxTicket = parseInt(req.body.maxTicket);
          inputDataEvent.updatedAt = new Date(req.body.updatedAt);
          inputDataEvent.categoryId = parseInt(req.body.categoryId);
          inputDataEvent.organizerId = parseInt(req.body.organizerId);
          console.log('successss');
        }
        console.log('input data setelah parsing', inputDataEvent);
        console.log('tipe cityId', typeof inputDataEvent.cityId);
        console.log('ticket', tickets);
        const ticketTypes = tickets && Array.isArray(tickets)
          ? {
            create: tickets.map((ticket: any) => ({
              ticketTypeId: parseInt(ticket.ticketTypeId),
              price: parseInt(ticket.price),
              quantity: parseInt(ticket.quantity),
            })),
          }
          : {
            create: {
              ticketTypeId: 10,
              price: 0,
              quantity: inputDataEvent.availableSeats,
            },
          };

        // Combine event data with ticket types
        const data = {
          ...inputDataEvent,
          ticketTypes,
        };


        console.log('yukbisayuk', data);
        const eventWithTicketTypes = await prisma.event.create({
          data: data,
        });
      }

      // const findEvent = await getUniqueEvent({ title: req.body.title });

      // console.log(findEvent);
      // if (fs.existsSync(join(__dirname, "../../public", `/${findEvent?.imageUrl}`))) {
      //   fs.unlinkSync(join(__dirname, "../../public", `/${findEvent?.imageUrl}`));
      //   console.log("File deleted successfully.");
      // } else {
      //   console.log("File does not exist.");
      // }

      res.status(200).send({
        rc: 200,
        success: true,
        message: 'Create Event success',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }

  async getOrganizerById(req: Request, res: Response) {
    try {
      const userId = res.locals.user.id;
      const organizer = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          username: true,
          email: true,
          imageProfile: true,
        },
      });

      if (!organizer) {
        return res.status(404).json({ message: 'Organizer not found' });
      }

      return res.status(200).json({ data: organizer });
    } catch (error) {
      console.error('Error getting organizer:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateOrganizerById(req: Request, res: Response) {
    try {
      const userId = res.locals.user.id;

      const { username, email, password } = req.body;

      const updateData: Prisma.UserUpdateInput = {};

      if (username !== undefined) {
        updateData.username = username;
      }

      if (email !== undefined) {
        updateData.email = email;
      }

      if (password !== undefined) {
        const salt = await genSalt(10);
        const hashPassword = await hash(password, salt);
        updateData.password = hashPassword;
      }

      const updatedOrganizer = await prisma.user.update({
        where: { id: userId },
        data: updateData,
        select: {
          id: true,
          username: true,
          email: true,
        },
      });

      return res.status(200).json({ data: updatedOrganizer });
    } catch (error) {
      console.error('Error updating organizer:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getEventsByOrganizer(req: Request, res: Response) {
    try {
      const organizerId = res.locals.user.id;
      const events = await prisma.event.findMany({
        where: {
          organizerId: organizerId,
        },
        include: {
          organizer: true,
          city: true,
          ticketTypes: {
            include: {
              ticketType: true,
            },
          },
        },
      });
      return res.status(200).json({ data: events });
    } catch (error) {
      console.error('Error getting events by organizer:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getTransactionsByFilter(req: Request, res: Response) {
    try {
      const { eventId, startDate, endDate } = req.query;
      const organizerId = res.locals.user.id;

      const where: any = {
        event: {
          organizerId: organizerId,
        },
      };

      if (eventId) {
        where.eventId = parseInt(eventId as string);
      }

      if (startDate && endDate) {
        where.createdAt = {
          gte: new Date(startDate as string),
          lte: new Date(endDate as string),
        };
      }

      const transactions = await prisma.transaction.findMany({
        where,
        include: {
          event: {
            select: {
              id: true,
              title: true,
            },
          },
          user: true,
        },
      });

      return res.status(200).json({ data: transactions });
    } catch (error) {
      console.error('Error getting transactions by filter:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async createPromotion(req: Request, res: Response) {
    const { username, email, password, role } = req.body;
    const referralCode = (Math.random() * 100000).toString();
    const newSampleData = await prisma.user.create({
      data: { username, email, password, role, referralCode },
    });

    return res.status(201).send(newSampleData);
  }

  async getCustomerCountByDate(req: Request, res: Response) {
    try {
      const { eventId, startDate, endDate } = req.query;
      const organizerId = res.locals.user.id;

      const where: any = {
        event: {
          organizerId: organizerId,
        },
        status: 'success',
      };

      if (eventId) {
        where.eventId = parseInt(eventId as string);
      }

      if (startDate && endDate) {
        where.createdAt = {
          gte: new Date(startDate as string),
          lte: new Date(endDate as string),
        };
      }

      const transactions = await prisma.transaction.findMany({
        where,
        select: {
          createdAt: true,
        },
      });

      const customerCountByDate = transactions.reduce(
        (acc: { [key: string]: number }, transaction) => {
          const date = transaction.createdAt.toISOString().split('T')[0];
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        },
        {},
      );

      console.log('customerCountByDate:', customerCountByDate);

      return res.status(200).json({ data: customerCountByDate });
    } catch (error) {
      console.error('Error getting customer count by date:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getOrganizerSummary(req: Request, res: Response) {
    try {
      const organizerId = res.locals.user.id;
  
      const transactions = await prisma.transaction.findMany({
        where: {
          event: { organizerId: organizerId },
          status: 'success',
        },
      });
  
      const totalRevenue = transactions.reduce((sum, transaction) => {
        return sum + (transaction.totalPrice.toNumber() - transaction.discountAmount.toNumber());
      }, 0);
  
      const completedEvents = await prisma.event.count({
        where: {
          organizerId: organizerId,
          endDate: { lte: new Date() },
        },
      });
  
      const successfulTransactions = await prisma.transaction.count({
        where: {
          event: { organizerId: organizerId },
          status: 'success',
        },
      });
  
      const summary = {
        totalRevenue,
        completedEvents,
        successfulTransactions,
      };
  
      return res.status(200).json({ data: summary });
    } catch (error) {
      console.error('Error getting organizer summary:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
