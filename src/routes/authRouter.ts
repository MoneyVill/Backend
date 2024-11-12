import express from "express";
import {
  registerTeacher,
  authenticateTeacher,
  logout,
} from "../controllers/authTeacherController";
import {
  registerStudent,
  authenticateStudent,
} from "../controllers/authStudentController";
const router = express.Router();

router.post("/teacher/register", registerTeacher);
router.post("/teacher/login", authenticateTeacher);
router.post("/student/register", registerStudent);
router.post("/student/login", authenticateStudent);
router.post("/logout", logout);

export default router;
