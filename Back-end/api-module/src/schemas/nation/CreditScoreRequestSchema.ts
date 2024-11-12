// src/models/nation/CreditScoreReq.ts

import { Schema, model, Document } from 'mongoose';

// CreditScoreReq 인터페이스: 신용등급 평점 부여 시 필요한 데이터 구조 정의
interface ICreditScoreReq extends Document {
    type: boolean;
}

// Mongoose 스키마 정의 및 유효성 검증 설정
const CreditScoreReqSchema: Schema = new Schema({
    type: {
        type: Boolean,
        required: [true, "428"], // 필수 필드로 설정, 유효하지 않을 시 메시지 코드 "428"
    },
});

// Mongoose 모델 생성: CreditScoreReq 스키마를 기반으로 CreditScoreReqModel 생성
const CreditScoreReqModel = model<ICreditScoreReq>('CreditScoreReq', CreditScoreReqSchema);

export { CreditScoreReqModel, ICreditScoreReq };
