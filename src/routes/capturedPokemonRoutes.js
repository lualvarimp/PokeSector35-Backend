import express from 'express';
import { getPokedexByUser, addCapturedPokemon, getCapturesBySlot } from '../controllers/capturedPokemonController.js';
import { verifyToken } from '../middlewares/index.js';

const router = express.Router();

router.get('/:userId/pokedex', verifyToken, getPokedexByUser);
router.post('/:userId/pokedex', verifyToken, addCapturedPokemon);
router.get('/:userId/captures/:slotId', verifyToken, getCapturesBySlot);

export default router;