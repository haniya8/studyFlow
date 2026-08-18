import express from 'express';
import { getTaskStats, getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/stats', requireAuth, getTaskStats);
router.get('/', requireAuth, getTasks);
router.post('/', requireAuth, createTask);
router.patch('/:id', requireAuth, updateTask)
router.delete('/:id', requireAuth, deleteTask);

export { router };