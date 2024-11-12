import { Request, Response } from "express";
import Student from "../models/Student";
import { generateToken} from "../utils/auth";
import {
  BadRequestError,
  AuthenticationError,
} from "../middleware/errorMiddleware";
import asyncHandler from "express-async-handler";

// Register a new student
const registerStudent = asyncHandler(async (req: Request, res: Response) => {
  const {
    student_id,
    nation_id,
    job_id,
    nickname,
    password,
    name,
    bank_account,
    account_frozen,
    credit_score,
    grade_number,
    class_number,
    role,
    salary,
  } = req.body;

  // Check if a student with the same nickname already exists
  const studentExists = await Student.findOne({ nickname });

  if (studentExists) {
    res.status(409).json({ message: "The nickname already exists" });
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
    bank_account,
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
    throw new BadRequestError("An error occurred in registering the student");
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

export { registerStudent, authenticateStudent};
