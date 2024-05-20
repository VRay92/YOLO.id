import express, { Router } from 'express';
import { OrganizerController } from '../controllers/organizer.controller';

import { verifyToken } from "../middleware/verifyToken";
import { uploader } from '@/middleware/uploader';

import { regisValidation } from '@/middleware/vaidator/regis';


export class OrganizerRouter {
  private route: Router;
  private organizerController: OrganizerController;

  constructor() {
    this.route = Router();
    this.organizerController = new OrganizerController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.route.get('/profile', this.organizerController.getOrganizerById);
    this.route.put('/profile', this.organizerController.updateOrganizerById);

    this.route.post('/', verifyToken, uploader("/event", "EVENT").array("imgUrl"), this.organizerController.createEvent);
    this.route.get(
      '/events',
      this.organizerController.getEventsByOrganizer,
    );
    this.route.get(
      '/customers-count',
      this.organizerController.getCustomerCountByDate,
    );
    this.route.get(
      '/transactions/filter',
      this.organizerController.getTransactionsByFilter,
    );
    this.route.get(
      '/:eventId/customers/demographics',
      this.organizerController.getCustomerDemographics,
    );
  }
  getRouter(): Router {
    return this.route;
  }
}
