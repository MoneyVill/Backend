// src/models/nation/NationReq.ts

import { Schema, model, Document } from 'mongoose';

// NationReq 인터페이스: 나라 생성 시 필요한 데이터 구조 정의
interface INationReq extends Document {
    school: string;
    grade: number;
    room: number;
    title: string;
    currency: string;
}

// Mongoose 스키마 정의 및 유효성 검증 설정
const NationReqSchema: Schema = new Schema({
    school: {
        type: String,
        required: [true, "19"], // 필수 필드, 유효하지 않을 시 메시지 코드 "19"
    },
    grade: {
        type: Number,
        required: [true, "19"], // 필수 필드, 유효하지 않을 시 메시지 코드 "19"
    },
    room: {
        type: Number,
        required: [true, "19"], // 필수 필드, 유효하지 않을 시 메시지 코드 "19"
    },
    title: {
        type: String,
        required: [true, "19"], // 필수 필드, 유효하지 않을 시 메시지 코드 "19"
    },
    currency: {
        type: String,
        required: [true, "19"], // 필수 필드, 유효하지 않을 시 메시지 코드 "19"
    },
});

// Mongoose 모델 생성: NationReq 스키마를 기반으로 NationReqModel 생성
const NationReqModel = model<INationReq>('NationReq', NationReqSchema);

export { NationReqModel, INationReq };
