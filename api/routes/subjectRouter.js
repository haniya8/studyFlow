//api/routes/subjectRouter.js
import express from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import { getSubjects, createSubject, deleteSubject } from '../controllers/subjectController.js';

const router = express.Router();

router.get('/', requireAuth, getSubjects);
router.post('/', requireAuth, createSubject);
router.delete('/:id', requireAuth, deleteSubject);

export { router };