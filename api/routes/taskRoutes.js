import express from 'express';
import { getTaskStats, getTasks, createTask } from '../controllers/taskController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/stats', requireAuth, getTaskStats);
router.get('/', requireAuth, getTasks);
router.post('/', requireAuth, createTask);


export { router };