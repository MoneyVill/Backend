// src/schemas/certification/CertificationRes.ts

import { Schema, model, Document } from 'mongoose';

// CertificationRes 인터페이스: 인증서 조회 시 필요한 데이터 구조 정의
interface ICertificationRes extends Document {
    id: number;
    name: string;
    image: string;
}

// Mongoose 스키마 정의
const CertificationResSchema: Schema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

// Mongoose 모델 생성: CertificationRes 스키마를 기반으로 CertificationResModel 생성
const CertificationResModel = model<ICertificationRes>('CertificationRes', CertificationResSchema);

// Certification 엔터티에서 CertificationRes 객체를 생성하는 함수
function createCertificationResFromEntity(
    certification: any,
    image?: string
): ICertificationRes {
    const certRes = new CertificationResModel({
        id: certification.getId(),
        name: certification.getTeacher().getName(),
        image: image || certification.getImage(),
    });

    return certRes;
}

export { CertificationResModel, ICertificationRes, createCertificationResFromEntity };
