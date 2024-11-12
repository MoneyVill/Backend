// src/schemas/job/JobAllColumnSchema.ts

import { Schema, model, Document } from 'mongoose';

// JobAllCol 인터페이스: 교사가 전체 직업 조회할 때 필요한 데이터 구조 정의
interface IJobAllCol extends Document {
    id: number;
    title: string;
    image: string;
    color: string;
    creditRating: number;
    total: number;
    salary: string;
    count: number;
    studentNames: string[];
}

// Mongoose 스키마 정의
const JobAllColSchema: Schema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    creditRating: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
    studentNames: {
        type: [String],
        required: true,
        default: [],
    },
});

// Mongoose 모델 생성: JobAllCol 스키마를 기반으로 JobAllColModel 생성
const JobAllColModel = model<IJobAllCol>('JobAllCol', JobAllColSchema);

// of 메서드를 별도의 함수로 정의하여 JobAllCol 객체 생성
function createJobAllColFromStudentJob(
    studentJob: any,
    salary: string,
    image: string
): IJobAllCol {
    const studentNames = studentJob.getStudentNames();
    return new JobAllColModel({
        id: studentJob.getId(),
        title: studentJob.getTitle(),
        image,
        color: studentJob.getColor(),
        creditRating: studentJob.getCreditRating(),
        total: studentJob.getTotal(),
        salary,
        count: studentJob.getCount(),
        studentNames: studentNames ? studentNames.split(",") : [],
    });
}

export { JobAllColModel, IJobAllCol, createJobAllColFromStudentJob };
