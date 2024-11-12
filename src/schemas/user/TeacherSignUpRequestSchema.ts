// src/models/user/Teacher.ts

import { Schema, model, Document } from 'mongoose';
import { Role } from '../../user/Role';

// Teacher 인터페이스
interface ITeacher extends Document {
    teacher_id: number;
    nation_id: number;
    id: string;
    password: string;
    name: string;
    is_assigned?: boolean;
    role: Role;
}

// Mongoose 스키마 정의
const TeacherSchema: Schema = new Schema({
    teacher_id: {
        type: Number,
        required: true,
    },
    nation_id: {
        type: Number,
        required: true,
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
    is_assigned: {
        type: Boolean,
        required: false,
    },
    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.TEACHER,
    },
});

const TeacherModel = model<ITeacher>('Teacher', TeacherSchema);

export { TeacherModel, ITeacher };
