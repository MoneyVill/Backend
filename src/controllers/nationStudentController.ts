import { Request, Response } from "express";
import Student from "../models/Student";
import Nation from "../models/Nation";

export const enterNation = async (req: Request, res: Response) => {
  const { code } = req.body;

  // `nation_code`로 해당 국가 찾기
  const nation = await Nation.findOne({ code });
  if (!nation) {
    return res.status(404).json({ message: "Nation not found" });
  }

  // 학생의 `nation_id`를 해당 국가의 `_id`로 업데이트
  await Student.findByIdAndUpdate(req.user?._id, { nation_id: nation._id });
  res.status(200).json({ message: "Successfully joined the nation" });
};

export const leaveNation = async (req: Request, res: Response) => {
  // 현재 사용자의 ID를 이용해 `nation_id`를 null로 업데이트
  const student = await Student.findById(req.user?._id);
  if (!student) {
      return res.status(404).json({ error: "Student not found" });
  }

  // 학생의 관련 필드를 초기화
  student.nation_id = null;
  student.job_id = null;
  student.credit_score = 0;
  student.role = false;
  student.salary = 0;

  await student.save();

  res.status(200).json({ message: "Successfully left the nation" });
};