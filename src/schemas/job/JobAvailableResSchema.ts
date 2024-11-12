// src/schemas/job/JobAvailableResSchema.ts

import { Schema, model, Document } from 'mongoose';

// JobAvailableRes 인터페이스: 학생이 인원 미달 직업을 조회할 때 필요한 데이터 구조 정의
interface IJobAvailableRes extends Document {
    id: number;
    title: string;
    creditRating: number;
    count: number;
    total: number;
    image: string;
    color: string;
}

// Mongoose 스키마 정의
const JobAvailableResSchema: Schema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    creditRating: {
        type: Number,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
    total: {
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
});

// Mongoose 모델 생성: JobAvailableRes 스키마를 기반으로 JobAvailableResModel 생성
const JobAvailableResModel = model<IJobAvailableRes>('JobAvailableRes', JobAvailableResSchema);

// of 메서드를 별도의 함수로 정의하여 JobAvailableRes 객체 생성
function createJobAvailableResFromStudentJob(
    studentJob: any,
    image: string
): IJobAvailableRes {
    return new JobAvailableResModel({
        id: studentJob.getId(),
        title: studentJob.getTitle(),
        creditRating: studentJob.getCreditRating(),
        count: studentJob.getCount(),
        total: studentJob.getTotal(),
        image,
        color: studentJob.getColor(),
    });
}

export { JobAvailableResModel, IJobAvailableRes, createJobAvailableResFromStudentJob };
