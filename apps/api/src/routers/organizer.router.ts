import express, { Router } from 'express';
import { OrganizerController } from "../controllers/organizer.controller";

export class OrganizerRouter {
    private route: Router;
    private organizerController: OrganizerController;

    constructor() {
        this.route = Router();
        this.organizerController = new OrganizerController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.route.post(
            '/', this.organizerController.createEvent
        )
        this.route.post(
            '/price', this.organizerController.setPrice
        )
    }
    getRouter(): Router {
        return this.route;
    }
}