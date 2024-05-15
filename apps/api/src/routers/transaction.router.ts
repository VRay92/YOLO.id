import express, { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { regisValidation } from '../middleware/vaidator/regis';
import { TransactionController } from '@/controllers/transaction.controller';
import {
  authMiddleware,
  authorizeCustomer,
  authorizeOrganizer,
} from '@/middleware/protectedRoute';

export class TransactionRoute {
  private route: Router;
  private transactionController: TransactionController;

  constructor() {
    this.route = Router();
    this.transactionController = new TransactionController();
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.route.post(
      '/buy-ticket',
      authMiddleware,
      authorizeCustomer,
      this.transactionController.createTransaction,
    );
    this.route.post(
      '/claim-promo',
      authMiddleware,
      authorizeCustomer,
      this.transactionController.claimVoucher,
    );
    this.route.post(
      '/complete-payment',
      authMiddleware,
      authorizeOrganizer,
      this.transactionController.completePayment,
    );
  }
  getRouter(): Router {
    return this.route;
  }
}
