import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
} from 'express';
import cors from 'cors';
import { PORT } from './config';
import { AuthRouter } from './routers/auth.router';
import { OrganizerRouter } from './routers/organizer.router';
import { EventRouter } from './routers/event.router';
import { CustomerRouter } from './routers/customer.router';
import {
  authMiddleware,
  authorizeCustomer,
  authorizeOrganizer,
} from './middleware/protectedRoute';
import { ProfileRouter } from './routers/profile.router';
import { join } from 'path';

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use("/assets", express.static(join(__dirname, "../public")))
  }

  private handleError(): void {
    // Error handling middleware
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error('Error:', err.stack);
        res.status(500).send('Internal Server Error');
      },
    );
  }

  private routes(): void {
    const authRouter = new AuthRouter();
    const customerRouter = new CustomerRouter();
    const organizerRouter = new OrganizerRouter();
    const eventRouter = new EventRouter();
    const profileRouter = new ProfileRouter
    this.app.use('/api/organizer', authMiddleware, authorizeOrganizer, organizerRouter.getRouter());
    this.app.use('/api/event', eventRouter.getRouter());
    this.app.use('/api/auth', authRouter.getRouter());
    this.app.use(
      '/api/customer',
      authMiddleware,
      authorizeCustomer,
      customerRouter.getRouter(),
    );
    this.app.use('/api/profile', profileRouter.getRouter());

  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
}
