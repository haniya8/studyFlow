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
    const userId = req.userId;
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

    res.status(200).json({ tasks });
  } catch (err) {
    console.error('Get tasks error:', err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
};

const createTask = async (req, res) => {
  try {
    // read input from req.body and req.userId
    // validate required fields — return 400 if missing
    // prisma.task.create(...)
    // res.status(201).json(...)
    
    const { title, description, priority, dueDate, subjectId } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required.' });
    }
    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
        subjectId: subjectId ? Number(subjectId) : null,
        userId: req.userId,   // ← from the token, not req.body
      },
    });
    res.status(201).json({ task });
    
  } catch (err) {
    console.error('...', err);
    res.status(500).json({ error: '...' });
  }
};

export { getTaskStats, getTasks, createTask };


