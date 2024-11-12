// src/types/express-sse/index.d.ts

declare module 'express-sse' {
    import { Request, Response } from 'express';

    class SseEmitter {
        constructor(initial?: any, options?: { isSerialized?: boolean; initialEvent?: string });
        send(data: any, event?: string): void;
        init(req: Request, res: Response): void;
    }

    export = SseEmitter;
}
