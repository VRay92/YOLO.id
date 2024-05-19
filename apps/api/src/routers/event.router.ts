import express, { Router } from 'express';
import { EventController } from '@/controllers/event.controller';

export class EventRouter {
    private route: Router;
    private eventController: EventController;

    constructor() {
        this.route = Router();
        this.eventController = new EventController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.route.get(
            '/', this.eventController.getAllEvent,
        )
        this.route.get(
            '/lastId', this.eventController.getLastEventId,
        )

        this.route.get(
            '/filter', this.eventController.getEventByFilter
        )

        this.route.get('/fetch/by-title', this.eventController.getEventByTitle);
        this.route.get(
            '/:id', this.eventController.getEventDetail
        )

    }

    getRouter(): Router {
        return this.route;
    }
}