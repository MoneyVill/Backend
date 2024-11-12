// src/schemas/bank/InterestAll.ts

import { Schema, model, Document } from 'mongoose';

// InterestAll 인터페이스: 장기, 단기 이자율 데이터 구조 정의
interface IInterestAll extends Document {
    shortPeriod: number[];
    longPeriod: number[];
}

// Mongoose 스키마 정의
const InterestAllSchema: Schema = new Schema({
    shortPeriod: {
        type: [Number], // 배열 타입으로 설정
        required: true,
    },
    longPeriod: {
        type: [Number], // 배열 타입으로 설정
        required: true,
    },
});

// Mongoose 모델 생성: InterestAll 스키마를 기반으로 InterestAllModel 생성
const InterestAllModel = model<IInterestAll>('InterestAll', InterestAllSchema);

export { InterestAllModel, IInterestAll };
