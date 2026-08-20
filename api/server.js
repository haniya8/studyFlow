//api/server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { router as authRoutes } from './routes/authRouter.js';
import { router as taskRoutes } from './routes/taskRouter.js';
import { router as subjectRoutes} from './routes/subjectRouter.js';
import { router as notificationRoutes} from './routes/notificationRouter.js';
import { startNotificationScheduler } from './jobs/notificationScheduler.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  startNotificationScheduler();
});