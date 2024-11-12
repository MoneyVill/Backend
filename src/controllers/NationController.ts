import express, { Request, Response } from 'express';
import { NationService } from './services/NationService';
import { NationReqSchema, NationCreditReqSchema, TradingTimeReqSchema } from '../schemas/nation';
import { StockReqSchema } from './schemas/stock';
import { HttpStatus } from '../utils/HttpStatus';

const router = express.Router();
const nationService = new NationService();

/**
 * 나라 생성
 */
router.post('/teacher', async (req: Request, res: Response) => {
    const reqSchema: NationReqSchema = req.body;
    try {
        const result = await nationService.createNation(reqSchema, req);
        res.status(HttpStatus.OK).json(result);
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
});

/**
 * 나라 조회
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await nationService.getNation(req);
        res.status(HttpStatus.OK).json(result);
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
});

/**
 * 투자 종목 등록
 */
router.post('/teacher/stock', async (req: Request, res: Response) => {
    const stockReqSchema: StockReqSchema = req.body;
    try {
        await nationService.createStock(req, stockReqSchema);
        res.status(HttpStatus.OK).send();
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
});

/**
 * 국고 잔금 조회
 */
router.get('/treasury', async (req: Request, res: Response) => {
    try {
        const result = await nationService.findTreasury(req);
        res.status(HttpStatus.OK).json(result);
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
});

/**
 * 신용점수 등락폭 수정
 */
router.put('/teacher/credit', async (req: Request, res: Response) => {
    const schema: NationCreditReqSchema = req.body;
    try {
        await nationService.updateCredit(schema, req);
        res.status(HttpStatus.OK).send();
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
});

/**
 * 투자 거래 시간 수정
 */
router.put('/teacher/trading-time', async (req: Request, res: Response) => {
    const schema: TradingTimeReqSchema = req.body;
    try {
        await nationService.updateTradingTime(req, schema);
        res.status(HttpStatus.OK).send();
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
});

/**
 * 교사가 자신이 생성한 나라 수정
 */
router.put('/teacher', async (req: Request, res: Response) => {
    const reqSchema: NationReqSchema = req.body;
    try {
        const result = await nationService.updateNation(reqSchema, req);
        res.status(HttpStatus.OK).json(result);
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
});

/**
 * 교사의 나라 삭제
 */
router.delete('/teacher', async (req: Request, res: Response) => {
    try {
        await nationService.deleteNation(req);
        res.status(HttpStatus.OK).send();
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
});

export { router as NationController };
