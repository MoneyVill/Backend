// src/schemas/student/StudentMyPageResSchema.ts

import { Schema, model, Document } from 'mongoose';

// IStudentMyPageResSchema 인터페이스: 학생 내 정보 조회 시 필요한 데이터 구조 정의
interface IStudentMyPageResSchema extends Document {
    school: string;
    room: number;
    number: number;
    name: string;
    account: number;
    creditRating: number;
    jobImage: string | null;
    jobName: string | null;
    color: string | null;
    deposit: number;
    invest: number;
}

// Mongoose 스키마 정의: 학생 내 정보 조회에 필요한 필드 설정
const StudentMyPageResSchema = new Schema<IStudentMyPageResSchema>({
    school: { type: String, required: true },
    room: { type: Number, required: true },
    number: { type: Number, required: true },
    name: { type: String, required: true },
    account: { type: Number, required: true },
    creditRating: { type: Number, required: true },
    jobImage: { type: String, default: null },
    jobName: { type: String, default: null },
    color: { type: String, default: null },
    deposit: { type: Number, required: true },
    invest: { type: Number, required: true },
});

// Mongoose 모델 생성: StudentMyPageResSchema를 기반으로 StudentMyPageResModel 생성
const StudentMyPageResModel = model<IStudentMyPageResSchema>('StudentMyPageRes', StudentMyPageResSchema);

// createStudentMyPageRes 함수: Student, Nation, StudentJob 객체로부터 StudentMyPageRes 인스턴스를 생성
function createStudentMyPageRes(
    student: any,
    nation: any,
    studentJob: any,
    depositAmount: number,
    investAmount: number,
    imgUrl: string
): IStudentMyPageResSchema {
    return new StudentMyPageResModel({
        school: nation.getSchool(),
        room: nation.getRoom(),
        number: student.getNumber(),
        name: student.getName(),
        account: student.getAccount(),
        creditRating: student.getCreditRating(),
        jobImage: imgUrl,
        jobName: studentJob ? studentJob.getTitle() : null,
        color: studentJob ? studentJob.getColor() : null,
        deposit: depositAmount,
        invest: investAmount,
    });
}

export { StudentMyPageResModel, IStudentMyPageResSchema, createStudentMyPageRes };
