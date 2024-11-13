import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IStudent extends Document {
  student_id: string;
  nation_id: string;
  job_id: string;
  nickname: string;
  password: string;
  name: string;
  account: number;
  account_frozen: boolean;
  credit_score: number;
  grade_number: number;
  class_number: number;
  role: boolean;
  salary: number;
  comparePassword: (enteredPassword: string) => boolean;
}

const studentSchema = new Schema<IStudent>({
  student_id: {
    type: String,
    required: false,
  },
  nation_id: {
    type: String,
    required: false,
  },
  job_id: {
    type: String,
    required: false,
  },
  nickname: {
    type: String,
    required: true,
    unique: true,
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
  account_frozen: {
    type: Boolean,
    required: false,
    default: false,
  },
  credit_score: {
    type: Number,
    required: false,
    default: 0,
  },
  grade_number: {
    type: Number,
    required: false,
  },
  class_number: {
    type: Number,
    required: false,
  },
  role: {
    type: Boolean,
    required: true,
    default: true,
  },
  salary: {
    type: Number,
    required: false,
  },
});

// Hash the password before saving
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  // Auto-generate student_id if not provided
  if (!this.student_id) {
    this.student_id = `STU-${new mongoose.Types.ObjectId().toString()}`;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next()
});

// Compare passwords
studentSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Student = mongoose.model<IStudent>("Student", studentSchema);

export default Student;
