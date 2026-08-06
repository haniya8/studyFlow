import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../db/prisma';

const router = express.Router();

router.post('/signup', signup);

export {router};