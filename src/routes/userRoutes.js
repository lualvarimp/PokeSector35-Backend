import express from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser, getStats } from '../controllers/userController.js';
import { verifyToken, requireAdmin } from '../middlewares/index.js';

const router = express.Router();

router.get('/', verifyToken, requireAdmin, getAllUsers);
router.get('/:id', verifyToken, getUserById);
router.get('/:id/stats', verifyToken, getStats);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, requireAdmin, deleteUser);

export default router;