// src/sse/SseEmitters.ts

import SseEmitter from 'express-sse';
import { StudentSseSchema } from '../schemas/student/StudentSseSchema';
import { Logger } from 'tslog';

const log = new Logger();

class SseEmitters {
    private emitters: Set<SseEmitter> = new Set();

    /**
     * SSE Emitter 객체를 서버 메모리에 추가
     * @param emitter SseEmitter 객체
     */
    add(emitter: SseEmitter) {
        this.emitters.add(emitter);
        log.info("New emitter added:", emitter);
        log.info("Emitter list size:", this.emitters.size);

        // SSE는 기본적으로 timeout이나 close 이벤트를 제공하지 않으므로, 제거 로직을 필요할 때 명시적으로 호출
    }

    /**
     * 학생 목록을 SSE를 통해 연결된 모든 클라이언트에게 전송
     * @param student 학생 목록 데이터
     */
    send(student: StudentSseSchema[]) {
        this.emitters.forEach((emitter) => {
            try {
                log.info("[SSE send] :", emitter);
                emitter.send({
                    event: "studentList",
                    data: student
                });
            } catch (error) {
                log.error("[SSE send 실패] :", error);
                this.emitters.delete(emitter);
            }
        });
    }
}

// 싱글톤 인스턴스 생성
const sseEmitters = new SseEmitters();
export { sseEmitters };
