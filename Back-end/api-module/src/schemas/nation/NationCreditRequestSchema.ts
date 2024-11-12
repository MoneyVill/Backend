

import { Schema, model, Document } from 'mongoose';

// NationCreditReq 인터페이스: 신용점수 등락폭 수정 시 필요한 데이터 구조 정의
interface INationCreditReq extends Document {
    creditUp: number;
    creditDown: number;
}

// Mongoose 스키마 정의 및 유효성 검증 설정
const NationCreditReqSchema: Schema = new Schema({
    creditUp: {
        type: Number,
        required: [true, "407"], // 필수 필드로 설정, 유효하지 않을 시 메시지 코드 "407"
        min: [0, "407"], // 최소값 0 이상으로 설정
    },
    creditDown: {
        type: Number,
        required: [true, "408"], // 필수 필드로 설정, 유효하지 않을 시 메시지 코드 "408"
        min: [0, "408"], // 최소값 0 이상으로 설정
    },
});

// Mongoose 모델 생성: NationCreditReq 스키마를 기반으로 NationCreditReqModel 생성
const NationCreditReqModel = model<INationCreditReq>('NationCreditReq', NationCreditReqSchema);

export { NationCreditReqModel, INationCreditReq };
