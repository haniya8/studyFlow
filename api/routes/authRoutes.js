//api/routes/authRoutes.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../db/prisma.js';
import { signup } from '../controllers/authController.js';
import { login } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login)

export {router};