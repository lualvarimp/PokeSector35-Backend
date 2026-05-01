import { GameReplay } from '../models/index.js';

export async function saveReplay(userId, slotId, movements) {
  try {
    const replay = await GameReplay.create({
      user_id: userId,
      slot_id: slotId,
      movements: movements
    });
    return replay;
  } catch (error) {
    throw new Error('Error al guardar replay: ' + error.message);
  }
}

export async function getReplayBySlot(slotId) {
  try {
    const replay = await GameReplay.findOne({
      where: { slot_id: slotId }
    });
    if (!replay) {
      throw new Error('Replay no encontrado');
    }
    return replay;
  } catch (error) {
    throw new Error('Error al obtener replay: ' + error.message);
  }
}

export async function getReplaysByUser(userId) {
  try {
    const replays = await GameReplay.findAll({
      where: { user_id: userId }
    });
    return replays;
  } catch (error) {
    throw new Error('Error al obtener replays: ' + error.message);
  }
}

export async function deleteReplay(replayId) {
  try {
    const replay = await GameReplay.findByPk(replayId);
    if (!replay) {
      throw new Error('Replay no encontrado');
    }
    await replay.destroy();
    return { message: 'Replay eliminado' };
  } catch (error) {
    throw new Error('Error al eliminar replay: ' + error.message);
  }
}