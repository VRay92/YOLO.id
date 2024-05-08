import express, { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { regisValidation } from '../middleware/vaidator/regis';
import { CustomerController } from '@/controllers/customer.controller';

export class CustomerRouter {
  private route: Router;
  private customerController: CustomerController;

  constructor() {
    this.route = Router();
    this.customerController = new CustomerController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.route.post('/buy-ticket', this.customerController.buyTicket);
    this.route.post('/claim-promo', this.customerController.claimVoucher);
    this.route.post(
      '/complete-payment',
      this.customerController.completePayment,
    );
  }

  getRouter(): Router {
    return this.route;
  }
}
