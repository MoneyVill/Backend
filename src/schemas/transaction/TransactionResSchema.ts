// src/schemas/transaction/TransactionResSchema.ts

import { Schema, model, Document } from 'mongoose';

// ITransactionResSchema 인터페이스: 학생 입출금 내역 항목의 데이터 구조 정의
interface ITransactionResSchema extends Document {
    title: string;
    amount: string;
    source: string;
    balance: string;
}

// Mongoose 스키마 정의: 학생 입출금 내역 항목에 필요한 필드 설정
const TransactionResSchema = new Schema<ITransactionResSchema>({
    title: { type: String, required: true },    // 거래 제목
    amount: { type: String, required: true },   // 거래 금액
    source: { type: String, required: true },   // 거래 출처 또는 유형
    balance: { type: String, required: true },  // 거래 후 잔액
});

// Mongoose 모델 생성: TransactionResSchema를 기반으로 TransactionResModel 생성
const TransactionResModel = model<ITransactionResSchema>('TransactionRes', TransactionResSchema);

export { TransactionResModel, ITransactionResSchema, TransactionResSchema };
