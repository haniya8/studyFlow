// api/jobs/notificationScheduler.js
import cron from 'node-cron';
import { prisma } from '../db/prisma.js';
import { getDueSoonTasks, buildNotificationMessage } from '../utils/notificationRules.js';

async function generateNotificationsForAllUsers() {
  try {
    const users = await prisma.user.findMany({ select: { id: true } });

    for (const { id: userId } of users) {
      const dueSoonTasks = await getDueSoonTasks(userId);

      for (const task of dueSoonTasks) {
        const message = buildNotificationMessage(task);

        const existing = await prisma.notification.findFirst({
          where: { userId, taskId: task.id },
        });

        if (!existing) {
          await prisma.notification.create({
            data: { message, userId, taskId: task.id },
          });
        } else if (existing.message !== message) {
          // urgency changed (e.g. "due tomorrow" -> "due today") — update in place
          await prisma.notification.update({
            where: { id: existing.id },
            data: { message, read: false },
          });
        }
      }
    }

    console.log(`[notifications] generation run complete at ${new Date().toISOString()}`);
  } catch (err) {
    console.error('[notifications] generation run failed:', err);
  }
}

export function startNotificationScheduler() {
  // runs once a day at 7:00 AM server time — adjust as you like
  cron.schedule('0 7 * * *', generateNotificationsForAllUsers);

  // run once immediately on server start too, so you don't wait a full day to see it working
  generateNotificationsForAllUsers();
}