import { Request, Response } from 'express';
import prisma from '@/prisma';

export class OrganizerController {

  async createEvent(req: Request, res: Response) {

    try {
      console.log(Object.values(req.body))

      const { title, imageUrl, description, startDate, endDate, time, availableSeats, isFree, organizerId, locationId, createdAt, updatedAt, maxTicket, price, quantity, name, eventId, ticketTypeId } = req.body

      const dataForEventTable = {
        title,
        imageUrl,
        description,
        startDate,
        endDate,
        time,
        availableSeats,
        isFree,
        organizerId,
        locationId,
        createdAt,
        updatedAt,
        maxTicket,
      }

      const dataForEventTicketType = {
        price,
        quantity,
        eventId,
        ticketTypeId
      }

      const dataForTicketType = {
        name
      }


      if (Object.values(req.body).includes("")) {
        throw new Error("Fill in all form");
      } else {
        req.body.startDate = new Date(req.body.startDate);
        req.body.endDate = new Date(req.body.startDate);
      }
      const newEvent = await prisma.event.create({
        data: req.body

      });

      const newTicketType = await prisma.eventTicketType.create({
        data: dataForEventTicketType
      })
      return res.status(201).send(newEvent);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }

  async setPrice(req: Request, res: Response) {
    console.log(req.body)
    try {
      const newPrice = await prisma.eventTicketType.create({
        data: req.body
      })
      return res.status(201).send(newPrice);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  async getCustomerById(req: Request, res: Response) {
    const { id } = req.params;

    const sample = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!sample) {
      return res.send(404);
    }

    return res.status(200).send(sample);
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
