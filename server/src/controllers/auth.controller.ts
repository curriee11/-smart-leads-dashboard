import type { RequestHandler } from "express";

import { ApiError } from "../utils/api-error.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import { signAuthToken } from "../utils/token.js";
import { UserModel, type AuthUser } from "../models/user.model.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

const authResponse = (user: AuthUser) => ({
  user,
  token: signAuthToken({
    userId: user.id,
    role: user.role
  })
});

export const registerUser: RequestHandler = async (req, res, next) => {
  try {
    const payload = registerSchema.parse(req.body);
    const existingUser = await UserModel.findOne({ email: payload.email });

    if (existingUser) {
      throw new ApiError(409, "Email is already registered");
    }

    const user = await UserModel.create({
      name: payload.name,
      email: payload.email,
      password: await hashPassword(payload.password),
      role: payload.role ?? "sales"
    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: authResponse(user.toAuthJSON())
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const payload = loginSchema.parse(req.body);
    const user = await UserModel.findOne({ email: payload.email }).select("+password");

    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordValid = await comparePassword(payload.password, user.password);

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid email or password");
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: authResponse(user.toAuthJSON())
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser: RequestHandler = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Authenticated user fetched successfully",
    data: {
      user: req.user
    }
  });
};
