// src/schemas/bank/DepositReq.ts

import { Schema, model, Document } from 'mongoose';

// DepositReq 인터페이스: 예금 신청 시 필요한 데이터 구조 정의
interface IDepositReq extends Document {
    longPeriod: boolean;
    amount: number;
}

// Mongoose 스키마 정의
const DepositReqSchema: Schema = new Schema({
    longPeriod: {
        type: Boolean,
        required: true, // 필수 항목으로 설정
    },
    amount: {
        type: Number,
        required: true, // 필수 항목으로 설정
        min: [1, "723"], // 최소값 1 이상, 유효하지 않으면 메시지 코드 "723"
    },
});

// Mongoose 모델 생성: DepositReq 스키마를 기반으로 DepositReqModel 생성
const DepositReqModel = model<IDepositReq>('DepositReq', DepositReqSchema);

export { DepositReqModel, IDepositReq };
