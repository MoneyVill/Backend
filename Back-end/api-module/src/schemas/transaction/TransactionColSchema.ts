// src/schemas/transaction/TransactionColSchema.ts

import { Schema, model, Document } from 'mongoose';

// ITransactionColSchema 인터페이스: 학생 거래 내역 항목의 데이터 구조 정의
interface ITransactionColSchema extends Document {
    title: string;
    amount: string;
}

// Mongoose 스키마 정의: 거래 내역 항목에 필요한 필드 설정
const TransactionColSchema = new Schema<ITransactionColSchema>({
    title: {
        type: String,
        required: true
    },     // 거래 제목
    amount: { 
        type: String, 
        required: true 
    },    // 거래 금액
});

// Mongoose 모델 생성: TransactionColSchema를 기반으로 TransactionColModel 생성
const TransactionColModel = model<ITransactionColSchema>('TransactionCol', TransactionColSchema);

export { TransactionColModel, ITransactionColSchema, TransactionColSchema };
