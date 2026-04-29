import express from 'express';
import { getAllRanking, getUserRanking, createRanking, deleteRanking } from '../controllers/rankingController.js';
import { verifyToken, requireAdmin } from '../middlewares/index.js';
import { validateCreateRanking } from '../validations/index.js';

const router = express.Router();

router.get('/', getAllRanking);
router.get('/:userId', verifyToken, getUserRanking);
router.post('/:userId', verifyToken, validateCreateRanking, createRanking);
router.delete('/:rankingId', verifyToken, requireAdmin, deleteRanking);

export default router;