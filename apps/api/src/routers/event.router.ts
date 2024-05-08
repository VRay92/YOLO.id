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
    }

    getRouter(): Router {
        return this.route;
    }
}