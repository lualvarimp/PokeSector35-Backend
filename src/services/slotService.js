import { GameSlot } from '../models/index.js';

export async function getSlotsByUserId(userId) {
  const slots = await GameSlot.findAll({
    where: { user_id: userId }
  });
  return slots;
}

export async function getSlotByNumber(userId, slotNumber) {
  const slot = await GameSlot.findOne({
    where: { user_id: userId, slot_number: slotNumber }
  });

  if (!slot) {
    throw new Error('Slot no encontrado');
  }

  return slot;
}

export async function createNewSlot(userId, slotData) {
  const slot = await GameSlot.create({
    user_id: userId,
    ...slotData
  });

  return slot;
}

export async function updateSlotData(userId, slotNumber, slotData) {
  const slot = await getSlotByNumber(userId, slotNumber);
  await slot.update(slotData);
  return slot;
}

export async function deleteSlotData(userId, slotNumber) {
  const slot = await getSlotByNumber(userId, slotNumber);
  await slot.destroy();
  return { message: 'Slot eliminado' };
}