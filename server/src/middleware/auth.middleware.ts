import type { RequestHandler } from "express";

import type { UserRole } from "../models/user.model.js";
import { UserModel } from "../models/user.model.js";
import { ApiError } from "../utils/api-error.js";
import { verifyAuthToken } from "../utils/token.js";

export const authenticate: RequestHandler = async (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : undefined;

    if (!token) {
      throw new ApiError(401, "Authentication token is required");
    }

    const payload = verifyAuthToken(token);
    const user = await UserModel.findById(payload.userId);

    if (!user) {
      throw new ApiError(401, "Authenticated user no longer exists");
    }

    req.user = user.toAuthJSON();
    next();
  } catch (error) {
    next(error);
  }
};

export const authorize =
  (...allowedRoles: UserRole[]): RequestHandler =>
  (req, _res, next) => {
    if (!req.user) {
      next(new ApiError(401, "Authentication is required"));
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      next(new ApiError(403, "You do not have permission to perform this action"));
      return;
    }

    next();
  };

