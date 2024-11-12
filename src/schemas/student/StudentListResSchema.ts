// src/schemas/student/StudentListResSchema.ts

import { Schema, model, Document } from 'mongoose';

// IStudentListResSchema 인터페이스: 학생의 목록 조회 시 필요한 데이터 구조 정의
interface IStudentListResSchema extends Document {
    id: string; // MongoDB의 ObjectId
    name: string;
    number: number;
    amount: number;
    creditRating: number;
    job: string | null;
}

// Mongoose 스키마 정의: 학생 목록 조회에 필요한 필드 설정
const StudentListResSchema = new Schema<IStudentListResSchema>({
    name: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    creditRating: {
        type: Number,
        required: true,
    },
    job: {
        type: String,
        default: null,
    },
});

// Mongoose 모델 생성: StudentListResSchema를 기반으로 StudentListResModel 생성
const StudentListResModel = model<IStudentListResSchema>('StudentListRes', StudentListResSchema);

// createStudentListResFromEntity 함수: Student 객체를 받아 StudentListResModel 인스턴스를 생성
function createStudentListResFromEntity(student: any): IStudentListResSchema {
    return new StudentListResModel({
        _id: student.getId().toString(), // MongoDB ObjectId를 string으로 변환
        name: student.getName(),
        number: student.getNumber(),
        amount: student.getAccount(),
        creditRating: student.getCreditRating(),
        job: student.getStudentJob() ? student.getStudentJob().getTitle() : null,
    });
}

export { StudentListResModel, IStudentListResSchema, createStudentListResFromEntity };
