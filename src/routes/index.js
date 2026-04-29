import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import gameSlotRoutes from './gameSlotRoutes.js';
import capturedPokemonRoutes from './capturedPokemonRoutes.js';
import rankingRoutes from './rankingRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/users', gameSlotRoutes);
router.use('/users', capturedPokemonRoutes);
router.use('/ranking', rankingRoutes);

export default router;