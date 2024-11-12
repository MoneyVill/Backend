import mongoose, { Schema, Document } from 'mongoose';

// Account 인터페이스: MongoDB 문서 형식을 정의하여 amount와 title 필드가 포함되도록 설정
interface Account extends Document {
    amount: number;
    title: string;
}

// Mongoose 스키마 정의: 데이터베이스에 저장할 데이터 구조와 유효성 검증 규칙 설정
const AccountSchema: Schema = new Schema({
    amount: {
        type: Number,
        required: true,              // 필수 필드로 설정
        min: [0, "Amount must be positive"], // 최소값 0 이상으로 설정하고 유효하지 않을 시 에러 메시지 설정
    },
    title: {
        type: String,
        required: true               // 필수 필드로 설정
    }
});

// Mongoose 모델 생성: Account 스키마를 기반으로 AccountModel이라는 MongoDB 모델 생성
const AccountModel = mongoose.model<Account>('Account', AccountSchema);
