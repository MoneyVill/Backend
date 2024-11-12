// src/models/user/Student.ts

import { Schema, model, Document } from 'mongoose';
import { Role } from '../../user/Role';

// Student 인터페이스
interface IStudent extends Document {
    student_id: number;
    nation_id: number;
    job_id?: number;
    id: string;
    password: string;
    name: string;
    account?: number;
    is_frozen?: boolean;
    credit_score?: number;
    number?: number;
    role: Role;
    salary?: number;
}

// Mongoose 스키마 정의
const StudentSchema: Schema = new Schema({
    student_id: {
        type: Number,
        required: true,
    },
    nation_id: {
        type: Number,
        required: true,
    },
    job_id: {
        type: Number,
        required: false,
    },
    id: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    account: {
        type: Number,
        required: false,
    },
    is_frozen: {
        type: Boolean,
        required: false,
    },
    credit_score: {
        type: Number,
        required: false,
    },
    number: {
        type: Number,
        required: false,
    },
    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.STUDENT,
    },
    salary: {
        type: Number,
        required: false,
    },
});

const StudentModel = model<IStudent>('Student', StudentSchema);

export { StudentModel, IStudent };
