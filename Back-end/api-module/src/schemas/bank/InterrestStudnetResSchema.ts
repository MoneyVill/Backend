// src/schemas/bank/InterestStudentRes.ts

import { Schema, model, Document } from 'mongoose';
import { IDepositStudentRes } from './DepositStudentResSchema';

// InterestStudentRes 인터페이스: 학생 예금 신청 페이지 관련 데이터 구조 정의
interface IInterestStudentRes extends Document {
    creditRating: number;
    shortPeriod: number;
    longPeriod: number;
    account: number;
    myDeposit: IDepositStudentRes;
}

// Mongoose 스키마 정의
const InterestStudentResSchema: Schema = new Schema({
    creditRating: {
        type: Number,
        required: true,
    },
    shortPeriod: {
        type: Number,
        required: true,
    },
    longPeriod: {
        type: Number,
        required: true,
    },
    account: {
        type: Number,
        required: true,
    },
    myDeposit: {
        type: Schema.Types.ObjectId,
        ref: 'DepositStudentRes', // 참조 설정
        required: true,
    },
});

// Mongoose 모델 생성: InterestStudentRes 스키마를 기반으로 InterestStudentResModel 생성
const InterestStudentResModel = model<IInterestStudentRes>('InterestStudentRes', InterestStudentResSchema);

export { InterestStudentResModel, IInterestStudentRes };
