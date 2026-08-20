// controllers/notificationController.js
import { prisma } from '../db/prisma.js';

const getNotifications = async (req, res) => {
    try{
        const notifications = await prisma.notification.findMany(
            {
                where: { userId: req.user.id },
                orderBy: { createdAt: 'desc' }
            }
        );
        res.json(notifications);
    } catch(err) {
        console.error("Error Loading Notifications: ", err);
        res.status(500).json({error: 'Failed to fetch Notifications'});
    }
};

const createNotification = async (req, res) => {
    try{
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({error: 'Message is required'})
        }

        const notification = await prisma.notification.create(
            {
                data: {message: message, userId: req.user.id},
            }   
        );
        res.status(201).json(notification);

    } catch (err) {
        console.error('Error Adding Notification: ', err);
        res.status(500).json({error: 'Failed to create notification'});
    }
};

const deleteNotification = async(req,res) => {
    try{
        const {id} = req.params;
        const notification = await prisma.notification.findUnique(
            {
                where: {id: Number(id)},
            }
        );
        if(!notification || notification.userId !== req.user.id ){
            return res.status(404).json({ error: 'Notification not found.' });  
        }
        await prisma.notification.delete(
            {
                where: {id : Number(id)},
            }
        );
        res.status(204).send();
    }catch(err) {
        console.error('Delete Notification Error: ', err);
        res.status(500).json({error : 'Failed to delete notification'});
    }
};

const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await prisma.notification.findUnique({
      where: { id: Number(id) },
    });

    if (!notification || notification.userId !== req.user.id) {
      return res.status(404).json({ error: 'Notification not found.' });
    }

    const updated = await prisma.notification.update({
      where: { id: Number(id) },
      data: { read: true },
    });

    res.status(200).json(updated);
  } catch (err) {
    console.error('Mark Notification Read Error: ', err);
    res.status(500).json({ error: 'Failed to update notification' });
  }
};

const markAllAsRead = async (req, res) => {
  try {
    await prisma.notification.updateMany({
      where: { userId: req.user.id, read: false },
      data: { read: true },
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Mark All Notifications Read Error: ', err);
    res.status(500).json({ error: 'Failed to update notifications' });
  }
};

export { getNotifications, createNotification, deleteNotification, markAsRead, markAllAsRead };

