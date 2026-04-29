import { GameSlot } from '../models/index.js';

export async function getSlotsByUser(req, res) {
  try {
    const slots = await GameSlot.findAll({
      where: { user_id: req.params.userId }
    });
    res.json(slots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getSlotById(req, res) {
  try {
    const slot = await GameSlot.findOne({
      where: { user_id: req.params.userId, slot_number: req.params.slotNumber }
    });
    if (!slot) {
      return res.status(404).json({ error: 'Slot no encontrado' });
    }
    res.json(slot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createSlot(req, res) {
  try {
    const slot = await GameSlot.create({
      user_id: req.params.userId,
      ...req.body
    });
    res.status(201).json(slot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateSlot(req, res) {
  try {
    const slot = await GameSlot.findOne({
      where: { user_id: req.params.userId, slot_number: req.params.slotNumber }
    });
    if (!slot) {
      return res.status(404).json({ error: 'Slot no encontrado' });
    }
    await slot.update(req.body);
    res.json(slot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteSlot(req, res) {
  try {
    const slot = await GameSlot.findOne({
      where: { user_id: req.params.userId, slot_number: req.params.slotNumber }
    });
    if (!slot) {
      return res.status(404).json({ error: 'Slot no encontrado' });
    }
    await slot.destroy();
    res.json({ message: 'Slot eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}