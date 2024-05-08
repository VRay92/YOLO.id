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
}