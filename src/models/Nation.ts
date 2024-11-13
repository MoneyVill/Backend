import mongoose, { Document, Schema } from "mongoose";

// Nation 모델 인터페이스 정의
export interface INation extends Document {
  // nation_id: string;
  _id: mongoose.Schema.Types.ObjectId; // _id 타입 설정
  school: string;
  grade: number;
  classroom: number;
  title: string;
  code: string;
  currency: string;
  treasury?: number;
  stock?: string;
  trading_start?: string;
  trading_end?: string;
  credit_up?: number;
  credit_down?: number;
}

// Nation 스키마 정의
const nationSchema = new Schema<INation>({
  school: {
    type: String,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
  classroom: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  treasury: {
    type: Number,
    required: false,
    default: 0,
  },
  stock: {
    type: String,
    required: false,
  },
  trading_start: {
    type: String,
    required: false,
    match: /^\d{2}:\d{2}:\d{2}$/, // HH:MM:SS 형식의 시간
  },
  trading_end: {
    type: String,
    required: false,
    match: /^\d{2}:\d{2}:\d{2}$/, // HH:MM:SS 형식의 시간
  },
  credit_up: {
    type: Number,
    required: false,
    default: 20,
  },
  credit_down: {
    type: Number,
    required: false,
    default: 50,
  },
});

// Nation 모델 생성
const Nation = mongoose.model<INation>("Nation", nationSchema);

export default Nation;
