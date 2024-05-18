import prisma from "@/prisma"
import { Request, Response } from 'express';
import fs from "fs";
import { Prisma } from '@prisma/client';


export class LocationController {
    async getLocationByFilter(req: Request, res: Response) {
        try {
            const { title } = req.query;
            console.log('nilai req.query', title);
            if (typeof title === 'string') {
                const dataEvent = await prisma.city.findMany({
                    where: {
                        name: {
                            contains: title
                        }
                    }
                });;
                return res.status(200).send({
                    rc: 200,
                    success: true,
                    data: dataEvent
                });
            } else {
                return res.status(400).json({ error: 'Query parameter must be a string' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}