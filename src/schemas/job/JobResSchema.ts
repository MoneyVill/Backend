// src/schemas/job/JobResSchema.ts

import { Schema, model, Document } from 'mongoose';

// JobRes 인터페이스: 직업 명함 조회 시 필요한 데이터 구조 정의
interface IJobRes extends Document {
    id: number;
    title: string;
    detail: string;
    creditRating: number;
    wage: number;
    image: string;
    color: string;
    total: number;
    count: number;
}

// Mongoose 스키마 정의
const JobResSchema: Schema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    detail: {
        type: String,
        required: true,
    },
    creditRating: {
        type: Number,
        required: true,
    },
    wage: {
        type: Number,
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
    total: {
        type: Number,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
});

// Mongoose 모델 생성: JobRes 스키마를 기반으로 JobResModel 생성
const JobResModel = model<IJobRes>('JobRes', JobResSchema);

// of 메서드를 별도의 함수로 정의하여 JobRes 객체 생성
function createJobResFromStudentJob(
    studentJob: any,
    image: string
): IJobRes {
    return new JobResModel({
        id: studentJob.getId(),
        title: studentJob.getTitle(),
        detail: studentJob.getDetail(),
        creditRating: studentJob.getCreditRating(),
        wage: studentJob.getWage(),
        image,
        color: studentJob.getColor(),
        total: studentJob.getTotal(),
        count: studentJob.getCount(),
    });
}

export { JobResModel, IJobRes, createJobResFromStudentJob };
