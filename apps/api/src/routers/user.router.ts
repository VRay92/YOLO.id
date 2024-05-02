import { UserController } from '@/controllers/user.controller';
import { Router } from 'express';

export class UserRouter {
  private router: Router;
  private userController: UserController;

  constructor() {
    this.userController = new UserController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.userController.getAllUser);
    this.router.get('/:id', this.userController.getUserById);
    this.router.post('/', this.userController.createUser);
  }

  getRouter(): Router {
    return this.router;
  }
}
