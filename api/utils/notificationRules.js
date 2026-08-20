// api/utils/notificationRules.js
import { prisma } from '../db/prisma.js';

/**
 * Finds tasks for a user that are overdue, due today, or due tomorrow,
 * and are not yet completed. Reusable by both the in-app notification
 * generator and, later, an email/cron job.
 */
export async function getDueSoonTasks(userId) {
  const now = new Date();
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);

  const tomorrowEnd = new Date(todayStart);
  tomorrowEnd.setDate(tomorrowEnd.getDate() + 2); // covers today + tomorrow, exclusive upper bound

  return prisma.task.findMany({
    where: {
      userId,
      completed: false,
      dueDate: { lt: tomorrowEnd }, // overdue, due today, or due tomorrow
    },
  });
}

export function buildNotificationMessage(task) {
  const now = new Date();
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);

  const due = new Date(task.dueDate);
  due.setHours(0, 0, 0, 0);

  const diffDays = Math.round((due - todayStart) / 86400000);

  if (diffDays < 0) {
    return `"${task.title}" is overdue.`;
  }
  if (diffDays === 0) {
    return `"${task.title}" is due today.`;
  }
  return `"${task.title}" is due tomorrow.`;
}