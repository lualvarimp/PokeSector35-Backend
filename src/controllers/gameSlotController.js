import { getSlotsByUserId, getSlotByNumber, createNewSlot, updateSlotData, deleteSlotData } from '../services/index.js';

export async function getSlotsByUser(req, res) {
  try {
    const slots = await getSlotsByUserId(req.params.userId);
    res.json(slots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getSlotById(req, res) {
  try {
    const slot = await getSlotByNumber(req.params.userId, req.params.slotNumber);
    res.json(slot);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

export async function createSlot(req, res) {
  try {
    const slot = await createNewSlot(req.params.userId, req.body);
    res.status(201).json(slot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateSlot(req, res) {
  try {
    const slot = await updateSlotData(req.params.userId, req.params.slotNumber, req.body);
    res.json(slot);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

export async function deleteSlot(req, res) {
  try {
    const result = await deleteSlotData(req.params.userId, req.params.slotNumber);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}