import { Request, Response } from 'express';
import prisma from '@/prisma';

export class OrganizerController {
  async createEvent(req: Request, res: Response) {
    const { username, email, password, role } = req.body;
    const referralCode = (Math.random() * 100000).toString();
    const newSampleData = await prisma.user.create({
      data: { username, email, password, role, referralCode },
    });

    return res.status(201).send(newSampleData);
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
