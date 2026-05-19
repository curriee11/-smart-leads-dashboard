import jwt, { type SignOptions } from "jsonwebtoken";

import { env } from "../config/env.js";
import type { AuthTokenPayload } from "../types/jwt.js";
import { ApiError } from "./api-error.js";

export const signAuthToken = (payload: AuthTokenPayload): string => {
  const options: SignOptions = {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"]
  };

  return jwt.sign(payload, env.JWT_SECRET, {
    ...options
  });
};

export const verifyAuthToken = (token: string): AuthTokenPayload => {
  try {
    const payload = jwt.verify(token, env.JWT_SECRET);

    if (typeof payload === "string" || typeof payload.userId !== "string") {
      throw new ApiError(401, "Invalid authentication token");
    }

    return {
      userId: payload.userId,
      role: payload.role
    } as AuthTokenPayload;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(401, "Invalid or expired authentication token");
  }
};
