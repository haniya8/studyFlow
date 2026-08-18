import { useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Card from '../Card';
import { priorityColors } from '../../constants/TaskCardConstants';
import { deleteTaskDialogText } from '../../constants/MyTasksPageConstants';
import { useSubjects } from '../../contexts/SubjectsContext';
import { useTasks } from '../../contexts/TasksContext';
import EditTaskModal from './EditTaskModal';
import IconButton from '@mui/material/IconButton';
import { formatDueDateLabel } from '../../utils/formatDueDateLabel';

export default function TaskCard({ task }) {
  const { subjects } = useSubjects();
  const { deleteTask, toggleTaskComplete } = useTasks();
  const subject = subjects.find((s) => s.id === task.subjectId);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  console.log('raw dueDate:', task.dueDate, typeof task.dueDate);
  
  const { dueLabel } = formatDueDateLabel(task.dueDate);

  const handleDeleteConfirm = async () => {
    const result = await deleteTask(task.id);
    if (result.success) setDeleteConfirmOpen(false);
  };

  return (
    <Card sx={{ opacity: task.completed ? 0.6 : 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
  <Box sx={{ display: 'flex', gap: 1 }}>
    <Chip
      label={subject?.name || 'No subject'}
      size="small"
      sx={{
        bgcolor: subject ? `${subject.color}22` : '#EEE',
        color: subject?.color || 'text.secondary',
      }}
    />
    <Chip
      label={task.priority}
      size="small"
      sx={{ bgcolor: priorityColors[task.priority]?.bg, color: priorityColors[task.priority]?.color }}
    />
  </Box>

  <Box sx={{ display: 'flex', gap: 1 }}>
    <IconButton onClick={() => setEditOpen(true)} size="small">
      <EditOutlinedIcon />
    </IconButton>
      <IconButton 
        onClick={() => setDeleteConfirmOpen(true)}
        size="small"
        sx={{ 
          color: 'text.secondary', 
          '&:hover': { color: 'error.main' } 
        }}
      >
        <DeleteTwoToneIcon />
      </IconButton>
  </Box>
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
          <Typography variant="caption">{dueLabel}</Typography>
        </Box>
        <Checkbox checked={task.completed} onChange={()=> toggleTaskComplete(task.id)} size="small" />
      </Box>

    <EditTaskModal open={editOpen} onClose={() => setEditOpen(false)} task={task} />

      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>{deleteTaskDialogText.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            {deleteTaskDialogText.message(task.title)}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Button onClick={() => setDeleteConfirmOpen(false)} variant="outlined">
            {deleteTaskDialogText.cancelButton}
          </Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error">
            {deleteTaskDialogText.confirmButton}
          </Button>
        </DialogActions>
      </Dialog>

    </Card>
  );
}