import { CapturedPokemon } from '../models/index.js';

/**
 * Endpoint: GET /api/users/:id/pokedex
 * Obtiene el Pokédex completo de un usuario
 * Lista todos los Pokémon que ha capturado en todas sus partidas
 * @param {Object} req - Express request
 * @param {string} req.params.id - ID del usuario propietario del Pokédex
 * @param {Object} res - Express response
 * @returns {Array} Array de pokémon capturados
 * @example
 * // Respuesta:
 * // [{ id: 1, pokemon_id: 25, pokemon_name: "PIKACHU", is_global: true, captured_at: "2024-04-15T..." }, ...]
 */
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

/**
 * Endpoint: POST /api/users/:id/pokedex
 * Registra un nuevo Pokémon capturado en el Pokédex del usuario
 * El Pokémon puede ser captura global o local de un slot específico
 * Se integra con PokeAPI para validar que el Pokémon existe
 * @param {Object} req - Express request
 * @param {string} req.params.id - ID del usuario
 * @param {number} req.body.pokemon_id - ID del Pokémon (según PokeAPI)
 * @param {string} req.body.pokemon_name - Nombre del Pokémon (ej: "PIKACHU")
 * @param {number} [req.body.slot_id] - ID del slot donde fue capturado (opcional)
 * @param {boolean} [req.body.is_global] - Si es captura global (default: false)
 * @param {Object} res - Express response
 * @returns {Object} Objeto del Pokémon capturado con timestamp
 */
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

/**
 * Endpoint: DELETE /api/users/:id/pokedex/:pokemonId
 * Elimina un Pokémon del Pokédex de un usuario
 * Útil si se registró un Pokémon por error
 * @param {Object} req - Express request
 * @param {string} req.params.id - ID del usuario propietario
 * @param {string} req.params.pokemonId - ID de la captura a eliminar
 * @param {Object} res - Express response
 * @returns {Object} Mensaje de confirmación
 */
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

/**
 * Endpoint: GET /api/users/:userId/captures/:slotId
 * Obtiene solo los Pokémon capturados en un slot específico
 * Útil para ver qué capturó en esa partida en particular
 * @param {Object} req - Express request
 * @param {string} req.params.userId - ID del usuario (para validación)
 * @param {string} req.params.slotId - ID del slot
 * @param {Object} res - Express response
 * @returns {Array} Array de pokémon capturados en ese slot
 */
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
