import { Router } from "express";

import { getCurrentUser, loginUser, registerUser } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

export const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/me", authenticate, getCurrentUser);

