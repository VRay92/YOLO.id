import express, { Router } from 'express';
import { OrganizerController } from '../controllers/organizer.controller';
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
    this.route.post('/', this.organizerController.createEvent);
    this.route.post('/price', this.organizerController.setPrice);
    this.route.get(
      '/events/:organizerId',
      this.organizerController.getEventsByOrganizerId,
    );
    this.route.get(
      '/events/sorted-by-date',
      this.organizerController.getEventsSortedByDate,
    );
    this.route.get(
      '/transactions/sales',
      this.organizerController.getTransactionsByDateRange,
    );
    this.route.get(
      '/events/:eventId/customers/gender',
      this.organizerController.getCustomersByGender,
    );

    this.route.get(
      '/events/:eventId/customers/age-group',
      this.organizerController.getCustomersByAgeGroup,
    );
  }
  getRouter(): Router {
    return this.route;
  }
}
