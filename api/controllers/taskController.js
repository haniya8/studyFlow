//api/controllers/taskController.js
import { prisma } from '../db/prisma.js';
const VALID_PRIORITIES = ['LOW', 'MEDIUM', 'HIGH'];

const getTaskStats = async (req, res) => {
  try {
    const userId = req.user.id;
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
          
        },
      }),
    ]);

    res.status(200).json({ total, completed, inProgress, overdue });
  } catch (err) {
    console.error('Get task stats error:', err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
};


const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      sort = 'createdAt',
      order = 'desc',
      limit,
      completed,
      subjectId,
      search,
    } = req.query;

    const allowedSortFields = ['createdAt', 'dueDate', 'title', 'priority'];
    const sortField = allowedSortFields.includes(sort) ? sort : 'createdAt';
    const sortOrder = order === 'asc' ? 'asc' : 'desc';

    const where = { userId };

    if (completed !== undefined) {
      where.completed = completed === 'true';
    }

    if (subjectId !== undefined) {
      where.subjectId = Number(subjectId);
    }

    if (search) {
      where.title = { contains: search, mode: 'insensitive' };
    }

    const tasks = await prisma.task.findMany({
      where,
      orderBy: { [sortField]: sortOrder },
      take: limit ? Number(limit) : undefined,
      include: { subject: true },
    });

    res.status(200).json( tasks );
  } catch (err) {
    console.error('Get tasks error:', err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
};

const createTask = async (req, res) => {
  try {
        const { title, description, priority, dueDate, subjectId } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required.' });
    }
    if (priority && !VALID_PRIORITIES.includes(priority)) {
  return res.status(400).json({ error: 'Invalid priority.' });
}
    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
        subjectId: subjectId ? Number(subjectId) : null,
        userId: req.user.id,   // ← from the token, not req.body
      },
    });
    res.status(201).json( task );
    
  } catch (err) {
    console.error('...', err);
    res.status(500).json({ error: '...' });
  }
};

  const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.task.findUnique({
      where: { id: Number(id) },
    });

    if (!existing || existing.userId !== req.user.id) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    const { title, description, priority, dueDate, subjectId, completed } = req.body;

    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(priority !== undefined && { priority }),
        ...(dueDate !== undefined && { dueDate: dueDate ? new Date(dueDate) : null }),
        ...(subjectId !== undefined && { subjectId: subjectId ? Number(subjectId) : null }),
        ...(completed !== undefined && { completed }),
      },
    });

    res.status(200).json(task);
  } catch (err) {
    console.error('Update task error:', err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.task.findUnique({
      where: { id: Number(id) },
    });

    if (!existing || existing.userId !== req.user.id) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    await prisma.task.delete({
      where: { id: Number(id) },
    });

    res.status(204).send();
  } catch (err) {
    console.error('Delete task error:', err);
    res.status(500).json({ error: 'Failed to delete task.' });
  }
};

export { getTaskStats, getTasks, createTask, updateTask, deleteTask };


