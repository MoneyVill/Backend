import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import Teacher from "../models/Teacher";
import Student from '../models/Student'; // Adjust path as needed
import asyncHandler from "express-async-handler";
import { AuthenticationError } from "./errorMiddleware";

// Extend the Request interface to include user property
declare module "express-serve-static-core" {
  interface Request {
    user?: {
      _id: string;
      name: string;
      nickname: string;
      role: boolean;
      nation_id: string;
    };
  }
}

const authenticate = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract token from cookies or Authorization header
      let token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];

      if (!token) {
        throw new AuthenticationError("Token not found");
      }

      const jwtSecret = process.env.JWT_SECRET || "";
      const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

      if (!decoded || !decoded.userId || decoded.role === undefined) {
        throw new AuthenticationError("Invalid token payload");
      }

      let user;
      if (decoded.role === true) {
        // Fetch from Student if role is true
        user = await Student.findById(decoded.userId, "_id name nickname");
      } else {
        // Fetch from Teacher if role is false
        user = await Teacher.findById(decoded.userId, "_id name nickname");
      }

      if (!user) {
        throw new AuthenticationError("User not found");
      }
      req.user = user;
      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new AuthenticationError("Token expired");
      } else if (error instanceof JsonWebTokenError) {
        throw new AuthenticationError("Invalid token format or signature");
      } else {
        throw new AuthenticationError("Invalid token");
      }
    }
  }
);

export { authenticate };
