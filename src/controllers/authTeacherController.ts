import { Request, Response } from "express";
import Teacher from "../models/Teacher";
import { generateToken, clearToken } from "../utils/auth";
import {
  BadRequestError,
  AuthenticationError,
} from "../middleware/errorMiddleware";
import asyncHandler from "express-async-handler";


// Register a new teacher
const registerTeacher = asyncHandler(async (req: Request, res: Response) => {
  const { name, nation_id, nickname, password, teacher_id, role } = req.body;
  const teacherExists = await Teacher.findOne({ nickname });

  if (teacherExists) {
    res.status(409).json({ message: "The nickname already exists" });
    return; // Prevents further execution
  }

  const teacher = await Teacher.create({
    name,
    nickname,
    password,
    role: false,
  });

  if (teacher) {
    generateToken(res, teacher._id);
    res.status(201).json({
      id: teacher._id,
      name: teacher.name,
      nickname: teacher.nickname,
      role: teacher.role,
    });
  } else {
    throw new BadRequestError("An error occurred in registering the teacher");
  }
});

// Authenticate an existing teacher
const authenticateTeacher = asyncHandler(async (req: Request, res: Response) => {
  const { nickname, password } = req.body;
  const teacher = await Teacher.findOne({ nickname });

  if (teacher && (await teacher.comparePassword(password))) {
    generateToken(res, teacher._id);
    res.status(200).json({
      id: teacher._id,
      name: teacher.name,
      nickname: teacher.nickname,
      role: teacher.role,
    });
  } else {
    throw new AuthenticationError("Teacher not found or password incorrect");
  }
});

// Logout
const logout = asyncHandler(async (req: Request, res: Response) => {
  clearToken(res);
  res.status(200).json({ message: "Successfully logged out" });
});

export { registerTeacher, authenticateTeacher, logout };
