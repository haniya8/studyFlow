import { Box, Typography, Chip, Checkbox } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Card from '../Card';
import { priorityColors } from '../../constants/TaskCardConstants';
import { useSubjects } from '../../contexts/SubjectsContext';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useTasks } from '../../contexts/TasksContext'; 
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EditTaskModal from './EditTaskModal';
import { useState } from 'react';
export default function TaskCard({ task }) {
  const { subjects } = useSubjects();
  const { removeTask, toggleTaskComplete } = useTasks();
  const subject = subjects.find((s) => s.id === task.subjectId);
  const [editOpen, setEditOpen] = useState(false);

  return (
    <Card sx={{ opacity: task.completed ? 0.6 : 1 }}>
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'space-between', mb: 1 }}>
        <Chip
          label={subject?.name || 'No subject'}
          size="small"
          sx={{
            bgcolor: subject ? `${subject.color}22` : '#EEE', // light tint of the subject color
            color: subject?.color || 'text.secondary',
          }}
        />
        <Chip
          label={task.priority}
          size="small"
          sx={{ bgcolor: priorityColors[task.priority]?.bg, color: priorityColors[task.priority]?.color }}
        />
        <EditOutlinedIcon onClick={() => setEditOpen(true)}/>
        <DeleteOutlineOutlinedIcon onClick={() => removeTask(task.id)} />
      </Box>

      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 700, textDecoration: task.completed ? 'line-through' : 'none' }}
      >
        {task.title}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {task.description}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
          <CalendarTodayIcon fontSize="inherit" />
          <Typography variant="caption">{task.dueDate}</Typography>
        </Box>
        <Checkbox checked={task.completed} onChange={()=> toggleTaskComplete(task.id)} size="small" />
      </Box>

    <EditTaskModal open={editOpen} onClose={() => setEditOpen(false)} task={task} />

    </Card>
  );
}