

import { Schema, model, Document } from 'mongoose';

// TradingTimeReq 인터페이스: 거래 시간 수정 시 필요한 데이터 구조 정의
interface ITradingTimeReq extends Document {
    tradingStart: Date; // JavaScript에서 시간은 Date 객체로 다룹니다
    tradingEnd: Date;
}

// Mongoose 스키마 정의 및 유효성 검증 설정
const TradingTimeReqSchema: Schema = new Schema({
    tradingStart: {
        type: Date,
        required: [true, "709"], // 필수 필드로 설정, 유효하지 않을 시 메시지 코드 "709"
    },
    tradingEnd: {
        type: Date,
        required: [true, "710"], // 필수 필드로 설정, 유효하지 않을 시 메시지 코드 "710"
    },
});

// Mongoose 모델 생성: TradingTimeReq 스키마를 기반으로 TradingTimeReqModel 생성
const TradingTimeReqModel = model<ITradingTimeReq>('TradingTimeReq', TradingTimeReqSchema);

export { TradingTimeReqModel, ITradingTimeReq };
