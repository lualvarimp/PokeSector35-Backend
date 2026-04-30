import express from 'express';
import { createReplay, getReplay, getUserReplays, removeReplay } from '../controllers/replayController.js';
import { verifyToken, requireAdmin } from '../middlewares/index.js';

const router = express.Router();

router.post('/:userId/slots/:slotId/replay', verifyToken, createReplay);
router.get('/:userId/replays', verifyToken, getUserReplays);
router.get('/:userId/slots/:slotId/replay', verifyToken, getReplay);
router.delete('/:replayId', verifyToken, requireAdmin, removeReplay);

export default router;