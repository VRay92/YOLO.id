import { Request, Response } from 'express';
import prisma from '@/prisma';

export class ReviewController {
    async createReview(req: Request, res: Response) {
        try {
            const { rating, comment, userId, eventId } = req.body;

            // Validate input
            if (!rating || !comment || !userId || !eventId) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            // Create a new review
            const newReview = await prisma.review.create({
                data: {
                    rating,
                    comment,
                    userId,
                    eventId,
                },
            });

            // Send response
            res.status(201).json({ message: 'Review created successfully', review: newReview });
        } catch (error) {
            console.error('Error creating review:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}