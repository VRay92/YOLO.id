import express, { Router } from 'express';
import { LocationController } from '@/controllers/location.controller';

export class LocationRouter {
    private route: Router;
    private locationController: LocationController;

    constructor() {
        this.route = Router();
        this.locationController = new LocationController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.route.get(
            '/filter', this.locationController.getLocationByFilter
        )
    }

    getRouter(): Router {
        return this.route;
    }
}