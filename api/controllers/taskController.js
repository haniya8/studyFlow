import { prisma } from '../db/prisma.js';

const getTaskStats = async (req, res) => {
  try {
    const userId = req.userId;
    const now = new Date();

    const [total, completed, overdue, inProgress] = await Promise.all([
      prisma.task.count({ where: { userId } }),
      prisma.task.count({ where: { userId, completed: true } }),
      prisma.task.count({
        where: { userId, completed: false, dueDate: { lt: now } },
      }),
      prisma.task.count({
        where: {
          userId,
          completed: false,
          OR: [{ dueDate: null }, { dueDate: { gte: now } }],
        },
      }),
    ]);

    res.status(200).json({ total, completed, inProgress, overdue });
  } catch (err) {
    console.error('Get task stats error:', err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
};

export { getTaskStats };