import express from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser, getStats } from '../controllers/userController.js';
import { verifyToken, requireAdmin } from '../middlewares/index.js';
import { restoreUser, permanentDeleteUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', verifyToken, requireAdmin, getAllUsers);
router.get('/:id', verifyToken, getUserById);
router.get('/:id/stats', verifyToken, getStats);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, requireAdmin, deleteUser);
router.put('/:id/restore', verifyToken, requireAdmin, restoreUser);
router.delete('/:id/permanent', verifyToken, requireAdmin, permanentDeleteUser);

export default router;