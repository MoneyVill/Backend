import { Request, Response } from "express";
import Nation from "../models/Nation";
import Teacher from "../models/Teacher";
import Student from "../models/Student";
const asyncHandler = require("express-async-handler");

// 6자리 국가 코드를 생성하는 유틸리티 함수 (중복 없는 고유 코드 생성)
async function generateUniqueClassCode(): Promise<string> {
  let code = "";
  let isUnique = false;

  while (!isUnique) {
    code = Math.floor(100000 + Math.random() * 900000).toString();
    const existingNation = await Nation.findOne({ code });
    if (!existingNation) {
      isUnique = true; // 중복이 없을 경우 반복 종료
    }
  }

  return code;
}

// 나라 생성
export const createNation = asyncHandler(async (req: Request, res: Response) => {
    const classCode = await generateUniqueClassCode(); // 중복 없는 고유 코드 생성
    const nationData = { ...req.body, code: classCode };

    const newNation = await Nation.create(nationData);
    await Teacher.findByIdAndUpdate(req.user?._id, { nation_id: newNation._id });
    res.status(201).json(newNation);
});

// 나라 조회
export const getNation = asyncHandler(async (req: Request, res: Response) => {
    const nation = await Nation.findById(req.params.nation_id);
    if (!nation) {
        return res.status(404).json({ error: "Nation not found" });
    }
    res.status(200).json(nation);
});

// 나라 수정
export const updateNation = asyncHandler(async (req: Request, res: Response) => {
    const updatedNation = await Nation.findByIdAndUpdate(req.params.nation_id, req.body, { new: true });
    if (!updatedNation) {
        return res.status(404).json({ error: "Nation not found" });
    }
    res.status(200).json(updatedNation);
});

// 나라 삭제
export const deleteNation = asyncHandler(async (req: Request, res: Response) => {
    // 국가를 삭제
    const deletedNation = await Nation.findByIdAndDelete(req.params.nation_id);
    if (!deletedNation) {
        return res.status(404).json({ error: "Nation not found" });
    }

    // 해당 국가에 속한 학생들의 관련 필드 초기화
    await Student.updateMany(
        { nation_id: req.params.nation_id },
        {
            nation_id: null,
            job_id: null,
            credit_score: 0,
            role: false,
            salary: 0,
        }
    );
    res.status(200).json({ message: "Nation and associated student nation IDs deleted successfully" });
});

// export { createNation, getNation, updateNation, deleteNation };
