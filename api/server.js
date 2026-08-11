//api/server.js
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { router as authRoutes } from './routes/authRoutes.js';
import { router as taskRoutes } from './routes/taskRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});