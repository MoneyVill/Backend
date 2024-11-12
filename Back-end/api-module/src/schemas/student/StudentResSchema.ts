// src/schemas/student/StudentResSchema.ts

import { Schema, model, Document } from 'mongoose';
import { TransactionColSchema, ITransactionColSchema } from '../transaction/TransactionColSchema';

// IStudentResSchema 인터페이스: 학생 상세 정보 및 거래 내역을 포함하는 데이터 구조 정의
interface IStudentResSchema extends Document {
    studentId: Schema.Types.ObjectId;  // MongoDB의 ObjectId
    studentName: string;
    isFrozen: boolean;
    creditScore: number;
    transactions: Map<string, ITransactionColSchema[]>;
}

// Mongoose 스키마 정의: 학생 상세 정보 조회에 필요한 필드 설정
const StudentResSchema = new Schema<IStudentResSchema>({
    studentId: { type: Schema.Types.ObjectId, required: true, ref: 'Student' },
    studentName: { type: String, required: true },
    isFrozen: { type: Boolean, required: true },
    creditScore: { type: Number, required: true },
    transactions: {
        type: Map,
        of: [{ type: Schema.Types.ObjectId, ref: 'TransactionCol' }],  // 트랜잭션 목록 참조
        required: true,
    },
});

// Mongoose 모델 생성: StudentResSchema를 기반으로 StudentResModel 생성
const StudentResModel = model<IStudentResSchema>('StudentRes', StudentResSchema);

// createStudentRes 함수: Student와 거래 내역 데이터를 받아 StudentRes 인스턴스를 생성
function createStudentRes(
    student: any,
    transactionsMap: Map<string, ITransactionColSchema[]>
): IStudentResSchema {
    return new StudentResModel({
        studentId: student.getId().toString(),
        studentName: student.getName(),
        isFrozen: student.isFrozen(),
        creditScore: student.getCreditScore(),
        transactions: transactionsMap,
    });
}

export { StudentResModel, IStudentResSchema, createStudentRes };
