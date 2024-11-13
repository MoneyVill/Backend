import { Router } from "express";
import { enterNation, leaveNation } from "../controllers/nationStudentController";

const router = Router();

// Student-specific routes for nation actions
router.post("/enter", enterNation);   // POST /api/student/enter - Join a nation
router.post("/leave", leaveNation);  // POST /api/student/leave - Leave a nation

export default router;
