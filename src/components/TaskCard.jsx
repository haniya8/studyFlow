import { Box, Typography, Chip, Checkbox } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Card from './Card';
import { subjectColors, priorityColors } from '../constants/TaskCardConstants'; 

export default function TaskCard({ task }) {
  const isDone = task.status === 'Done';

  return (
    <Card sx={{ opacity: isDone ? 0.6 : 1 }}>
      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
        <Chip
          label={task.subject}
          size="small"
          sx={{ bgcolor: subjectColors[task.subject]?.bg, color: subjectColors[task.subject]?.color }}
        />
        <Chip
          label={task.priority}
          size="small"
          sx={{ bgcolor: priorityColors[task.priority]?.bg, color: priorityColors[task.priority]?.color }}
        />
      </Box>

      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 700, textDecoration: isDone ? 'line-through' : 'none' }}
      >
        {task.title}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {task.description}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
          <CalendarTodayIcon fontSize="inherit" />
          <Typography variant="caption">{task.due}</Typography>
        </Box>
        <Checkbox checked={isDone} size="small" />
      </Box>
    </Card>
  );
}