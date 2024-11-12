// src/schemas/bank/DepositStudentRes.ts

import { Schema, model, Document } from 'mongoose';

// DepositStudentRes 인터페이스: 내가 신청한 예금 정보의 데이터 구조 정의
interface IDepositStudentRes extends Document {
    interest: number;
    startDate: string;
    endDate: string;
    creditRating: number;
    amount: number;
    depositAmount: number;
    end: boolean;
}

// Mongoose 스키마 정의
const DepositStudentResSchema: Schema = new Schema({
    interest: {
        type: Number,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    creditRating: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    depositAmount: {
        type: Number,
        required: true,
    },
    end: {
        type: Boolean,
        required: true,
    },
});

// Mongoose 모델 생성: DepositStudentRes 스키마를 기반으로 DepositStudentResModel 생성
const DepositStudentResModel = model<IDepositStudentRes>('DepositStudentRes', DepositStudentResSchema);

export { DepositStudentResModel, IDepositStudentRes };
