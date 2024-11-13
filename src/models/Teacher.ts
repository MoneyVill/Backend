import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface ITeacher extends Document {
  teacher_id: string;
  nation_id?: string;
  nickname: string;
  password: string;
  name: string;
  is_assigned?: boolean;
  role: boolean;
  comparePassword: (enteredPassword: string) => boolean;
}

const teacherSchema = new Schema<ITeacher>({
  teacher_id: {
    type: String,
    required: false,
    unique: true,
  },
  nation_id: {
    type: String,
    required: false,
    unique: true,
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
  is_assigned: {
    type: Boolean,
    required: false,
    default: true,
  },
  role: {
    type: Boolean,
    required: false,
    default: false,
  },
});

// Hash the password before saving
teacherSchema.pre("save", async function (next) {
  // If the password has not been modified, skip password hashing and continue
  if (!this.isModified("password")) {
    return next();
  }

  // Auto-generate nation_id if not provided
  if (!this.nation_id) {
    this.nation_id = `CTY-${new mongoose.Types.ObjectId().toString()}`;
  }
  // Auto-generate teacher_id if not provided
  if (!this.teacher_id) {
    this.teacher_id = `TEA-${new mongoose.Types.ObjectId().toString()}`;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// Compare passwords
teacherSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Teacher = mongoose.model<ITeacher>("Teacher", teacherSchema);

export default Teacher;
