import fs from 'fs';
import path from 'path';
import { Router } from 'express';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();
const routesPath = path.join(__dirname);

fs.readdirSync(routesPath).forEach((file) => {
  if (file !== 'index.ts') { // index.ts 자체를 불러오지 않기 위해 체크
    const route = require(`./${file}`).default;

    // 파일 이름에 따라 경로 설정
    if (file === 'authRouter.ts') {
      router.use(route);
    } else if (file === 'userRouter.ts') {
      router.use('/users', authenticate, route); // 특정 경로 및 미들웨어 설정
    } else if (file === 'teacherRouter.ts') { 
      router.use('/teacher', authenticate, route); // `/api/nations` 경로로 연결
    } else if (file === 'studentRouter.ts') { 
      router.use('/student', authenticate, route); // `/api/nations` 경로로 연결
    }
  }
});

export default router;