import { Router } from "express";
import { ProfileController } from "../controllers/profile.controller";
import { uploader } from "../middleware/uploader";
import { verifyToken } from "../middleware/verifyToken";

export class ProfileRouter {
    private router: Router;
    private profileController: ProfileController;

    constructor() {
        this.router = Router();
        this.profileController = new ProfileController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.patch("/photo", verifyToken, uploader("/profile", "PROFILE").single("imgProfile"), this.profileController.updateProfileImg);
    }

    getRouter(): Router {
        return this.router;
    }
}