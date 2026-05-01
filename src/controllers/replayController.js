import { saveReplay, getReplayBySlot, getReplaysByUser, deleteReplay } from '../services/index.js';

export async function createReplay(req, res) {
  try {
    const { movements } = req.body;
    const userId = req.params.userId;
    const slotId = req.params.slotId;

    if (!movements || !Array.isArray(movements)) {
      return res.status(400).json({ error: 'Movements debe ser un array' });
    }

    const replay = await saveReplay(userId, slotId, movements);
    res.status(201).json(replay);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getReplay(req, res) {
  try {
    const slotId = req.params.slotId;
    const replay = await getReplayBySlot(slotId);
    res.json(replay);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

export async function getUserReplays(req, res) {
  try {
    const userId = req.params.userId;
    const replays = await getReplaysByUser(userId);
    res.json(replays);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function removeReplay(req, res) {
  try {
    const replayId = req.params.replayId;
    const result = await deleteReplay(replayId);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}