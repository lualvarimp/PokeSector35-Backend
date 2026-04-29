import { CapturedPokemon } from '../models/index.js';

export async function getPokedexByUser(req, res) {
  try {
    const pokedex = await CapturedPokemon.findAll({
      where: { user_id: req.params.userId, is_global: true }
    });
    res.json(pokedex);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function addCapturedPokemon(req, res) {
  try {
    const captured = await CapturedPokemon.create({
      user_id: req.params.userId,
      ...req.body
    });
    res.status(201).json(captured);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getCapturesBySlot(req, res) {
  try {
    const captures = await CapturedPokemon.findAll({
      where: { 
        user_id: req.params.userId,
        slot_id: req.params.slotId
      }
    });
    res.json(captures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}