import express from 'express';
import { getSlotsByUser, getSlotById, createSlot, updateSlot, deleteSlot } from '../controllers/gameSlotController.js';

const router = express.Router();

router.get('/:userId/slots', getSlotsByUser);
router.get('/:userId/slots/:slotNumber', getSlotById);
router.post('/:userId/slots', createSlot);
router.put('/:userId/slots/:slotNumber', updateSlot);
router.delete('/:userId/slots/:slotNumber', deleteSlot);

export default router;
