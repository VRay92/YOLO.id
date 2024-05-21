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
    this.route.get('/profile', this.customerController.getCustomerById);
    this.route.put('/profile', this.customerController.updateCustomerById);
    this.route.get('/voucher', this.customerController.getCustomerVoucherById);
    this.route.get('/purchasedEvent', this.customerController.getCustomerPurchasedEventByUserId)
  }

  getRouter(): Router {
    return this.route;
  }
}
