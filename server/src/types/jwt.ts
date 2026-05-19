import type { UserRole } from "../models/user.model.js";

export interface AuthTokenPayload {
  userId: string;
  role: UserRole;
}

