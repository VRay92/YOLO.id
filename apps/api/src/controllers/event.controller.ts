import { Request, Response } from 'express';
import prisma from '@/prisma';

export class EventController {
  async getAllEvent(req: Request, res: Response) {
    try {
      const query = req.query
      console.log("nilai query", query)
      const dataEvent = await prisma.event.findMany()
      return res.status(201).send(dataEvent)
    } catch (error) {
      console.log(error)
    }
  }
  // const filterData = music.filter((val: any) =>
  //   val.title.toLowerCase().startsWith(debouncedSearch),
  // );

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