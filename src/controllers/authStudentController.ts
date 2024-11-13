import { Request, Response } from "express";
import Student from "../models/Student";
import { generateToken } from "../utils/auth";
import {BadRequestError, AuthenticationError,} from "../middleware/errorMiddleware";
import asyncHandler from "express-async-handler";

// signup a new student
const signupStudent = asyncHandler(async (req: Request, res: Response) => {
  const {
    student_id,
    nickname,
    password,
    name,
    passwordConfirm
  } = req.body;
  // Check if password and passwordConfirm match
  if (password !== passwordConfirm) {
    res.status(400).json({ message: "Passwords do not match" });
    return; // Prevents further execution
  }
  // Create a new student with default values for specific fields

  const student = await Student.create({
    student_id,
    nation_id: null, // Set to null by default
    job_id: null,     // Set to null by default
    nickname,
    password,
    name,
    account: 0,
    account_frozen: false,
    credit_score: 0, // Default to 0
    grade_number: 0,
    class_number: 0,
    role: true,
    salary: 0,       // Default to 0
  });
  if (student) {
    generateToken(res, student._id);
    res.status(201).json({
      id: student._id,
      name: student.name,
      nickname: student.nickname,
      role: student.role,
    });
  } else {
    throw new BadRequestError("An error occurred in signuping the student");
  }
});


// Authenticate an existing student
const authenticateStudent = asyncHandler(async (req: Request, res: Response) => {
  const { nickname, password } = req.body;
  const student = await Student.findOne({ nickname });

  if (student && (await student.comparePassword(password))) {
    generateToken(res, student._id);
    res.status(200).json({
      id: student._id,
      name: student.name,
      nickname: student.nickname,
      role: student.role,
    });
  } else {
    throw new AuthenticationError("Student not found or password incorrect");
  }
});

export { signupStudent, authenticateStudent };
