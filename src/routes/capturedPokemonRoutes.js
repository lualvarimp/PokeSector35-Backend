import express from 'express';
import { getPokedexByUser, addCapturedPokemon, getCapturesBySlot, deleteCapturedPokemon } from '../controllers/capturedPokemonController.js';
import { verifyToken } from '../middlewares/index.js';

const router = express.Router();

router.get('/:id/pokedex', verifyToken, getPokedexByUser);
router.post('/:id/pokedex', verifyToken, addCapturedPokemon);
router.delete('/:id/pokedex/:pokemonId', verifyToken, deleteCapturedPokemon);
router.get('/:userId/captures/:slotId', verifyToken, getCapturesBySlot);

export default router;