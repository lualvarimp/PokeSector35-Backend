import express from 'express';
import { getPokedexByUser, addCapturedPokemon, getCapturesBySlot } from '../controllers/capturedPokemonController.js';

const router = express.Router();

router.get('/:userId/pokedex', getPokedexByUser);
router.post('/:userId/pokedex', addCapturedPokemon);
router.get('/:userId/captures/:slotId', getCapturesBySlot);

export default router;