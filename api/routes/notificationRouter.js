//api/routes/notificationRouter.js
import express from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import { getNotifications, createNotification, deleteNotification, markAsRead, markAllAsRead  } from '../controllers/notificationController.js';

const router = express.Router();

router.get('/', requireAuth, getNotifications);
router.post('/', requireAuth, createNotification);
router.patch('/:id/read', requireAuth, markAsRead);
router.patch('/read-all', requireAuth, markAllAsRead);
router.delete('/:id', requireAuth, deleteNotification);

export { router };