import { Request, Response } from "express";
import Teacher from "../models/Teacher";
import Student from "../models/Student";

import { generateToken} from "../utils/auth";
import {
  BadRequestError,
  AuthenticationError,
} from "../middleware/errorMiddleware";
import asyncHandler from "express-async-handler";


// signup a new teacher
const signupTeacher = asyncHandler(async (req: Request, res: Response) => {
  const { name, nickname, password, passwordConfirm } = req.body;

  // Check if password and passwordConfirm match
  if (password !== passwordConfirm) {
    res.status(400).json({ message: "Passwords do not match" });
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
    throw new BadRequestError("An error occurred in signuping the teacher");
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

const IdDuplicateCheck = asyncHandler(async (req: Request, res: Response) => {
  const { nickname } = req.body;

  try {
    const teacherExists = await Teacher.findOne({ nickname });
    const studentExists = await Student.findOne({ nickname});
    if (teacherExists || studentExists) {
      res.status(409).json({ message: "The nickname already exists" });
      return; // Prevents further execution
    }
    else {
      res.status(200).json({isDuplicated: false});
    }

  } catch (error) {
    res.status(500).json({ message: "Server error while checking nickname", error });
  }
});

export { signupTeacher, authenticateTeacher, IdDuplicateCheck};

