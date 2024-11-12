import { Schema, model, Document } from 'mongoose';
import { Role } from '../../user/Role';

export interface Teacher extends Document {
    identity: string;
    name: string;
    role: Role;
}

const TeacherSchema = new Schema({
    identity: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), required: true },
});

export const TeacherModel = model<Teacher>('Teacher', TeacherSchema);
