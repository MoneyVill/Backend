// import { Router } from "express";
// import { createNation, getNation, updateNation, deleteNation } from "../controllers/nationTeacherController";
// import { joinNation, leaveNation } from "../controllers/nationStudentController";

// const router = Router();

// // 교사용 국가 관련 엔드포인트 (교사 인증 필요)
// router.post("/teacher", createNation);       // 교사 전용 국가 생성
// router.get("/teacher/:nation_id", getNation);       // 교사 전용 국가 조회
// router.put("/teacher/:nation_id", updateNation);    // 교사 전용 국가 수정
// router.delete("/teacher/:nation_id", deleteNation); // 교사 전용 국가 삭제

// // 학생용 국가 관련 엔드포인트 (학생 인증 필요)
// router.post("/student/join", joinNation);   // 학생 전용 국가 가입
// router.post("/student/leave", leaveNation);

// export default router;
