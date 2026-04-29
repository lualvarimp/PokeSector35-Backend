import express from 'express';
import { getSlotsByUser, getSlotById, createSlot, updateSlot, deleteSlot } from '../controllers/gameSlotController.js';
import { verifyToken } from '../middlewares/index.js';
import { validateCreateSlot, validateUpdateSlot } from '../validations/index.js';

const router = express.Router();

router.get('/:userId/slots', verifyToken, getSlotsByUser);
router.get('/:userId/slots/:slotNumber', verifyToken, getSlotById);
router.post('/:userId/slots', verifyToken, validateCreateSlot, createSlot);
router.put('/:userId/slots/:slotNumber', verifyToken, validateUpdateSlot, updateSlot);
router.delete('/:userId/slots/:slotNumber', verifyToken, deleteSlot);

export default router;