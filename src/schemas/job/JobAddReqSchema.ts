

import { Schema, model, Document } from 'mongoose';

// JobAddReq 인터페이스: 직업 추가 시 필요한 데이터 구조 정의
interface IJobAddReq extends Document {
    title: string;
    detail: string;
    total: number;  //직업의 총 정원
    wage: number;   //직업에 대한 급여
    color: string;
    creditRating: number;
    image: string;
}

// Mongoose 스키마 정의 및 유효성 검증 설정
const JobAddReqSchema: Schema = new Schema({
    title: {
        type: String,
        required: [true, "410"], // 필수 필드, 유효하지 않을 시 메시지 코드 "410"
        maxlength: [8, "410"], // 최대 길이 8로 설정
    },
    detail: {
        type: String,
        required: [true, "411"], // 필수 필드, 유효하지 않을 시 메시지 코드 "411"
    },
    total: {
        type: Number,
        required: [true, "412"], // 필수 필드, 유효하지 않을 시 메시지 코드 "412"
    },
    wage: {
        type: Number,
        required: [true, "413"], // 필수 필드, 유효하지 않을 시 메시지 코드 "413"
    },
    color: {
        type: String,
        required: [true, "414"], // 필수 필드, 유효하지 않을 시 메시지 코드 "414"
    },
    creditRating: {
        type: Number,
        required: [true, "426"], // 필수 필드, 유효하지 않을 시 메시지 코드 "426"
    },
    image: {
        type: String,
        required: [true, "425"], // 필수 필드, 유효하지 않을 시 메시지 코드 "425"
    },
});

// Mongoose 모델 생성: JobAddReq 스키마를 기반으로 JobAddReqModel 생성
const JobAddReqModel = model<IJobAddReq>('JobAddReq', JobAddReqSchema);

export { JobAddReqModel, IJobAddReq };
