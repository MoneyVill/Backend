import { Request, Response } from "express";
import Student from "../models/Student";
import Teacher from "../models/Teacher";
import { BadRequestError } from "../middleware/errorMiddleware";
import { clearToken } from "../utils/auth";
import asyncHandler from "express-async-handler";

const getUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const userRole = req.user?.role; // false for Teacher, true for Student

  if (!userId) {
    throw new BadRequestError("User ID not found");
  }

  let user;

  // Check role to decide which model to query
  if (userRole === false) {
    // User is a Teacher
    user = await Teacher.findById(userId, "name teacher_id nation_id");
  } else if (userRole === true) {
    // User is a Student
    user = await Student.findById(userId, "name student_id nation_id");
  } else {
    // Handle cases where role is undefined or invalid
    throw new BadRequestError("Invalid user role");
  }

  if (!user) {
    throw new BadRequestError("User not available");
  }

  res.status(200).json(user);
});

// Logout
const logout = asyncHandler(async (req: Request, res: Response) => {
  clearToken(res);
  res.status(200).json({ message: "Successfully logged out" });
});

export { getUser, logout };
