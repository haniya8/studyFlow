//api/server.js
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { router as authRoutes } from './routes/authRouter.js';
import { router as taskRoutes } from './routes/taskRouter.js';
import { router as subjectRoutes} from './routes/subjectRouter.js'

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/subjects', subjectRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});