import { CapturedPokemon } from '../models/index.js';

export async function getPokedexByUser(req, res) {
  try {
    const pokedex = await CapturedPokemon.findAll({
      where: { user_id: req.params.id }
    });
    res.json(pokedex);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function addCapturedPokemon(req, res) {
  try {
    const { pokemon_id, pokemon_name, slot_id, is_global } = req.body;

    if (!pokemon_id || !pokemon_name) {
      return res.status(400).json({ error: 'pokemon_id y pokemon_name son requeridos' });
    }

    const captured = await CapturedPokemon.create({
      user_id: req.params.id,
      pokemon_id,
      pokemon_name,
      slot_id: slot_id || null,
      is_global: is_global || false,
      captured_at: new Date()
    });

    res.status(201).json(captured);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteCapturedPokemon(req, res) {
  try {
    const { id, pokemonId } = req.params;

    const result = await CapturedPokemon.destroy({
      where: { 
        id: pokemonId,
        user_id: id
      }
    });

    if (result === 0) {
      return res.status(404).json({ error: 'Pokémon no encontrado' });
    }

    res.json({ message: 'Pokémon eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getCapturesBySlot(req, res) {
  try {
    const captures = await CapturedPokemon.findAll({
      where: { 
        user_id: req.params.id,
        slot_id: req.params.slotId
      }
    });
    res.json(captures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}