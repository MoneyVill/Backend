import express from "express";
import {
  signupTeacher,
  authenticateTeacher,
  TeacherIdDuplicateCheck
} from "../controllers/authTeacherController";
import {
  signupStudent,
  authenticateStudent,
  StudentIdDuplicateCheck
} from "../controllers/authStudentController";
import { logout } from "../controllers/userController"

const router = express.Router();

router.post("/teacher/signup", signupTeacher);
router.post("/teacher/login", authenticateTeacher);
router.post("/student/signup", signupStudent);
router.post("/student/login", authenticateStudent);
router.post("/student/check-duplicate", StudentIdDuplicateCheck);
router.post("/teacher/check-duplicate", TeacherIdDuplicateCheck);
router.post("/logout", logout);

export default router;
