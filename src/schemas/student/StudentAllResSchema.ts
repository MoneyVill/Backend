// src/schemas/student/StudentAllRes.ts

import { Schema, model, Document } from 'mongoose';

// StudentAllRes 인터페이스: 학생이 반 친구 목록을 조회할 때 필요한 데이터 구조 정의
interface IStudentAllRes extends Document {
    number: number;
    name: string;
    jobName: string | null;
    creditRating: number;
}

// Mongoose 스키마 정의
const StudentAllResSchema: Schema = new Schema({
    number: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    jobName: {
        type: String,
        required: false,
        default: null,
    },
    creditRating: {
        type: Number,
        required: true,
    },
});

// Mongoose 모델 생성: StudentAllRes 스키마를 기반으로 StudentAllResModel 생성
const StudentAllResModel = model<IStudentAllRes>('StudentAllRes', StudentAllResSchema);

// of 메서드를 별도의 함수로 정의하여 StudentAllRes 객체 생성
function createStudentAllResFromEntities(
    student: any,
    studentJob: any
): IStudentAllRes {
    return new StudentAllResModel({
        number: student.getNumber(),
        name: student.getName(),
        jobName: studentJob ? studentJob.getTitle() : null,
        creditRating: student.getCreditRating(),
    });
}

export { StudentAllResModel, IStudentAllRes, createStudentAllResFromEntities };
