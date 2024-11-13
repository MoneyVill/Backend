
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import Teacher from "../models/Teacher";
import Student from "../models/Student";
// import asyncHandler from "express-async-handler";
const asyncHandler = require("express-async-handler");
import { AuthenticationError } from "./errorMiddleware";

// Extend the Request interface to include user property
declare module "express-serve-static-core" {
  interface Request {
    user?: {
      _id: string;
      name: string;
      nickname: string;
      role: boolean;
    };
  }
}

const authenticate = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract token from cookies or Authorization header
      let token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];

      if (!token) {
        throw new AuthenticationError("Token not found");
      }

      const jwtSecret = process.env.JWT_SECRET || "";
      const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

      if (!decoded || !decoded.userId) {
        throw new AuthenticationError("UserId not found");
      }

      // Attempt to find the user in Teacher or Student collections
      let user = await Teacher.findById(decoded.userId, "_id name nickname role");
      if (!user) {
        user = await Student.findById(decoded.userId, "_id name nickname role");
      }

      if (!user) {
        throw new AuthenticationError("User not found");
      }

      req.user = user;
      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return res.status(401).json({ error: "Token expired" });
      } else if (error instanceof JsonWebTokenError) {
        return res.status(401).json({ error: "Invalid token format or signature" });
      } else {
        return res.status(401).json({ error: error instanceof AuthenticationError ? error.message : "Authentication failed" });
      }
    }
  }
);

export { authenticate };
