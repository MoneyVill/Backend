import express from "express";
import {
  signupTeacher,
  authenticateTeacher,
  IdDuplicateCheck

} from "../controllers/authTeacherController";
import {
  signupStudent,
  authenticateStudent,
} from "../controllers/authStudentController";
import { logout } from "../controllers/userController"

const router = express.Router();

router.post("/teacher/signup", signupTeacher);
router.post("/teacher/login", authenticateTeacher);
router.post("/student/signup", signupStudent);
router.post("/student/login", authenticateStudent);
router.post("/check-duplicate", IdDuplicateCheck);

router.post("/logout", logout);

export default router;
