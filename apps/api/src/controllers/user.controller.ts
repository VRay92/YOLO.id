import { Request, Response } from 'express';
import prisma from '@/prisma';

export class UserController {
  async getAllUser(req: Request, res: Response) {
    const sampleData = await prisma.user.findMany();

    return res.status(200).send(sampleData);
  }

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;

    const sample = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!sample) {
      return res.send(404);
    }

    return res.status(200).send(sample);
  }

  async createUser(req: Request, res: Response) {
    const { username, email, password, role } = req.body;
    const referralCode = (Math.random() * 100000).toString()
    const newSampleData = await prisma.user.create({
      data: { username, email, password, role, referralCode },
    });

    return res.status(201).send(newSampleData);
  }
}
