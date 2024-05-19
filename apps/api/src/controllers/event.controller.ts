import { Request, Response } from 'express';
import prisma from '@/prisma';

export class EventController {
  async getAllEvent(req: Request, res: Response) {
    try {
      const query = req.query
      console.log(query)
      const dataEvent = await prisma.event.findMany()
      return res.status(201).send(dataEvent)
    } catch (error) {
      console.log(error)
    }
  }

  async getEventByFilter(req: Request, res: Response) {
    try {
      const query = req.query.title
      if (typeof query === 'string') {
        const dataEvent = await prisma.event.findMany({
          where: {
            title: { startsWith: query }
          }
        })
        return res.status(201).send({
          rc: 201,
          success: true,
          data: dataEvent
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getEventByTitle(req: Request, res: Response) {
    try {
      console.log("query", req.query)
      const events = await prisma.event.findFirst({
        where: req.query,
      });
      return res.status(200).json({ data: events })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getLastEventId(req: Request, res: Response) {
    try {
      const lastEvent = await prisma.event.findFirst({
        orderBy: { id: 'desc' }
      });

      if (lastEvent) {
        return res.status(200).json({ data: lastEvent.id });
      } else {
        return res.status(200).json({ data: 0 });
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getEventDetail(req: Request, res: Response) {
    const eventId = parseInt(req.params.id);

    try {
      const event = await prisma.event.findUnique({
        where: { id: eventId },
        include: {
          organizer: true,
          city: true,
          ticketTypes: {
            include: {
              ticketType: true,
            },
          },
          category: true,
        },
      });

      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }

      res.status(200).json({ data: event });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

}