
import { Schema, model, Document } from 'mongoose';

// Login 인터페이스: 로그인 시 필요한 identity와 password 필드 정의
export interface ILogin extends Document {
    id: string;
    password: string;
}

// Mongoose 스키마 정의 및 유효성 검사
const LoginSchema = new Schema<ILogin>({
    id: {
        type: String,
        required: [true, "100"], // 필수 필드로 설정 및 에러 메시지 코드 "100"
    },
    password: {
        type: String,
        required: [true, "104"], // 필수 필드로 설정 및 에러 메시지 코드 "104"
    },
});

// Mongoose 모델 생성
export const LoginModel = model<ILogin>('Login', LoginSchema);
