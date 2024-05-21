import { Router } from "express";
import { ReviewController } from "../controllers/review.controller";
import { uploader } from "../middleware/uploader";
import { verifyToken } from "../middleware/verifyToken";

export class ReviewRouter {
    private router: Router;
    private reviewController: ReviewController;

    constructor() {
        this.router = Router();
        this.reviewController = new ReviewController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/review', this.reviewController.createReview)
        this.router.get('/review', this.reviewController.createReview)
    }

    getRouter(): Router {
        return this.router;
    }
}