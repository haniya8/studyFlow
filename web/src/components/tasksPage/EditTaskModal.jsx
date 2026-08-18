// components/tasksPage/EditTaskModal.jsx
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Autocomplete,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { priorities, createTaskModalText, createTaskModalErrors } from '../../constants/MyTasksPageConstants';
import { useSubjects } from '../../contexts/SubjectsContext';
import { useTasks } from '../../contexts/TasksContext';

export default function EditTaskModal({ open, onClose, task }) {
  const { subjects } = useSubjects();
  const { updateTask } = useTasks();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState(null);
  const [priority, setPriority] = useState('Medium Priority');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setSubject(subjects.find((s) => s.id === task.subjectId) || null);
      setPriority(task.priority || 'Medium Priority');
      setDueDate(task.dueDate ? task.dueDate.slice(0, 10) : '');
      setErrors({});
    }
  }, [task, subjects]);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = createTaskModalErrors.title;
    if (!subject) newErrors.subject = createTaskModalErrors.subject;
    if (!dueDate) newErrors.dueDate = createTaskModalErrors.dueDate;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    const result = await updateTask(task.id, {
      title,
      description,
      subjectId: subject.id,
      priority,
      dueDate,
    });

    if (result.success) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Edit Task</Typography>
          <Typography variant="body2" color="text.secondary">
            Update the details for this task.
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Typography variant="caption" sx={{ fontWeight: 600 }}>{createTaskModalText.titleLabel}</Typography>
        <TextField
          fullWidth
          size="small"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={!!errors.title}
          helperText={errors.title}
          sx={{ mb: 2, mt: 0.5 }}
        />

        <Typography variant="caption" sx={{ fontWeight: 600 }}>DESCRIPTION</Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2, mt: 0.5 }}
        />

        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>{createTaskModalText.subjectLabel}</Typography>
            <Autocomplete
              size="small"
              value={subject}
              options={subjects}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, val) => option.id === val?.id}
              onChange={(event, newValue) => {
                setSubject(newValue);
              }}
              renderOption={(props, option) => (
                <Box component="li" {...props} key={option.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: option.color }} />
                    {option.name}
                  </Box>
                </Box>
              )}
              renderInput={(params) => (
                <TextField {...params} error={!!errors.subject} helperText={errors.subject} sx={{ mt: 0.5 }} />
              )}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>{createTaskModalText.priorityLabel}</Typography>
            <TextField
              select
              fullWidth
              size="small"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              sx={{ mt: 0.5 }}
            >
              {priorities.map((p) => (
                <MenuItem key={p.value} value={p.value}>{p.label}</MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>

        <Typography variant="caption" sx={{ fontWeight: 600 }}>{createTaskModalText.dueDateLabel}</Typography>
        <TextField
          type="date"
          size="small"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          error={!!errors.dueDate}
          helperText={errors.dueDate}
          sx={{ mt: 0.5, width: '50%' }}
        />
      </DialogContent>

      <DialogActions sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Button onClick={onClose} variant="outlined">Cancel</Button>
        <Button onClick={handleSave} variant="contained">Save Changes</Button>
      </DialogActions>
    </Dialog>
  );
}