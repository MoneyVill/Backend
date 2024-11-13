import { Router } from "express";
import { createNation, getNation, updateNation, deleteNation } from "../controllers/nationTeacherController";

const router = Router();

// Teacher-specific routes for nation management
router.post("/create", createNation);             // POST /api/teacher/create - Create a nation
router.get("/:nation_id", getNation);             // GET /api/teacher/:nation_id - Retrieve a nation
router.put("/:nation_id", updateNation);          // PUT /api/teacher/:nation_id - Update a nation
router.delete("/:nation_id", deleteNation);       // DELETE /api/teacher/:nation_id - Delete a nation

export default router;
