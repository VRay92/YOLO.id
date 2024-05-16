import { Request, Response } from 'express';
import prisma from '@/prisma';
import fs from "fs";
import { join } from "path";
import { getUniqueEvent, getUniqueUser } from '@/services/auth';

export class OrganizerController {

  async createEvent(req: Request, res: Response) {

    try {
      console.log("ssssssssssss", req.files)
      console.log("aaaaaaaaaaaaaaaaaaaaaa", req.body)
      // console.log(Object.values(req.body))
      // console.log("file upload info : ", req.file);
      // const inputDataEvent = { ...req.body, imageUrl: req.file?.filename }
      // if (Object.values(inputDataEvent).includes("")) {
      //   throw new Error("Fill in all form");
      // } else {
      //   req.body.startDate = new Date(req.body.startDate);
      //   req.body.endDate = new Date(req.body.startDate);
      // }
      // console.log("nilai input data", inputDataEvent)
      // const newEvent = await prisma.event.create({
      //   data: inputDataEvent

      // });
      // const findEvent = await getUniqueEvent({ title: req.body.title })
      // console.log(findEvent)
      // if (fs.existsSync(join(__dirname, "../../public", `/${findEvent?.imageUrl}`))) {
      //   fs.unlinkSync(join(__dirname, "../../public", `/${findEvent?.imageUrl}`));
      //   console.log("File deleted successfully.");
      // } else {
      //   console.log("File does not exist.");
      // }
      // res.status(200).send({
      //   rc: 200,
      //   success: true,
      //   message: "Update profile success",
      // })
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }

  async createTicket(req: Request, res: Response) {
    console.log(req.body)
    try {
      const newTicket = await prisma.eventTicketType.create({
        data: req.body
      })

      return res.status(201).send({ eventTicketType: newTicket });
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
          imageProfile: true
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
      const { username, email } = req.body;

      const updatedOrganizer = await prisma.user.update({
        where: { id: userId },
        data: {
          username,
          email,
        },
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

  async getEventsByOrganizerId(req: Request, res: Response) {
    try {
      const organizerId = parseInt(req.params.organizerId);

      const events = await prisma.event.findMany({
        where: {
          organizerId: organizerId,
        },
      });

      return res.status(200).json(events);
    } catch (error) {
      console.error('Error getting events by organizer ID:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getEventsSortedByDate(req: Request, res: Response) {
    try {
      const { startDate, endDate } = req.query;

      const events = await prisma.event.findMany({
        where: {
          startDate: {
            gte: new Date(startDate as string),
          },
          endDate: {
            lte: new Date(endDate as string),
          },
        },
        orderBy: {
          startDate: 'asc',
        },
      });

      return res.status(200).json(events);
    } catch (error) {
      console.error('Error getting events sorted by date:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getTransactionsByDateRange(req: Request, res: Response) {
    try {
      const { startDate, endDate } = req.query;

      const transactions = await prisma.transaction.aggregate({
        where: {
          createdAt: {
            gte: new Date(startDate as string),
            lte: new Date(endDate as string),
          },
          status: 'success',
        },
        _sum: {
          totalPrice: true,
        },
      });

      return res.status(200).json({ totalSales: transactions._sum.totalPrice });
    } catch (error) {
      console.error('Error getting transactions by date range:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getCustomersByGender(req: Request, res: Response) {
    try {
      const { eventId } = req.params;

      const customers = await prisma.user.findMany({
        where: {
          transactions: {
            some: {
              eventId: parseInt(eventId),
              status: 'success',
            },
          },
        },
        select: {
          gender: true,
        },
      });

      const genderCounts = {
        male: 0,
        female: 0,
        unknown: 0,
      };

      customers.forEach((customer) => {
        if (customer.gender === 'male') {
          genderCounts.male++;
        } else if (customer.gender === 'female') {
          genderCounts.female++;
        } else {
          genderCounts.unknown++;
        }
      });

      return res.status(200).json(genderCounts);
    } catch (error) {
      console.error('Error getting customers by gender:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getCustomersByAgeGroup(req: Request, res: Response) {
    try {
      const { eventId } = req.params;

      const customers = await prisma.user.findMany({
        where: {
          transactions: {
            some: {
              eventId: parseInt(eventId),
              status: 'success',
            },
          },
        },
        select: {
          age: true,
        },
      });

      const ageGroups = {
        '17-25': 0,
        '25-40': 0,
        '40+': 0,
      };

      customers.forEach((customer) => {
        if (customer.age !== null) {
          if (customer.age >= 17 && customer.age <= 25) {
            ageGroups['17-25']++;
          } else if (customer.age > 25 && customer.age <= 40) {
            ageGroups['25-40']++;
          } else if (customer.age > 40) {
            ageGroups['40+']++;
          }
        }
      });

      return res.status(200).json(ageGroups);
    } catch (error) {
      console.error('Error getting customers by age group:', error);
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

  async getEventByIdCustomer(req: Request, res: Response) {
    const { id } = req.params;

    const sample = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!sample) {
      return res.send(404);
    }

    return res.status(200).send(sample);
  }

  async getTransactionByIdCustomer(req: Request, res: Response) {
    const { id } = req.params;

    const sample = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!sample) {
      return res.send(404);
    }

    return res.status(200).send(sample);
  }
}
