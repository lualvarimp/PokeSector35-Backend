import express from 'express';
import { getAllRanking, getUserRanking, createRanking, deleteRanking } from '../controllers/rankingController.js';

const router = express.Router();

router.get('/', getAllRanking);
router.get('/:userId', getUserRanking);
router.post('/:userId', createRanking);
router.delete('/:rankingId', deleteRanking);

export default router;