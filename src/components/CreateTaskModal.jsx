// components/CreateTaskModal.jsx
import { useState } from 'react';
import {useTasks} from '../contexts/TasksContext';
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
import AddIcon from '@mui/icons-material/Add';
import { statuses, priorities, tasksPageText, createTaskModalText, createTaskModalErrors, defaultPriority } from '../constants/MyTasksPageConstants';
import { useSubjects } from '../contexts/SubjectsContext';

export default function CreateTaskModal({ open, onClose }) {
  const { subjects, addSubject } = useSubjects();
  const { addTask } = useTasks();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState(null); // now an object { id, name, color } or null
  const [priority, setPriority] = useState('Medium Priority');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = createTaskModalErrors.title;
    if (!subject) newErrors.subject = createTaskModalErrors.subject;
    if (!dueDate) newErrors.dueDate = createTaskModalErrors.dueDate;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    addTask({ title, description, subjectId: subject.id, priority, dueDate });
    
    handleClose();
    
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setSubject(null);
    setPriority('Medium Priority');
    setDueDate('');
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>{createTaskModalText.heading}</Typography>
          <Typography variant="body2" color="text.secondary">
            {createTaskModalText.subheading}
          </Typography>
        </Box>

        <IconButton onClick={handleClose} size="small"> 
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Typography variant="caption" sx={{ fontWeight: 600 }}>{createTaskModalText.titleLabel}</Typography>
        <TextField
          placeholder={createTaskModalText.titlePlaceholder}
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
          placeholder={createTaskModalText.descriptionPlaceholder}
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
              getOptionLabel={(option) => (typeof option === 'string' ? option : option.name)}
              isOptionEqualToValue={(option, val) => option.id === val?.id}
              filterOptions={(options, params) => {
                const filtered = options.filter((o) =>
                  o.name.toLowerCase().includes(params.inputValue.toLowerCase())
                );
                const exists = options.some(
                  (o) => o.name.toLowerCase() === params.inputValue.toLowerCase()
                );
                if (params.inputValue !== '' && !exists) {
                  filtered.push({ inputValue: params.inputValue, isNew: true });
                }
                return filtered;
              }}
              onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                  setSubject(addSubject(newValue));
                } else if (newValue?.isNew) {
                  setSubject(addSubject(newValue.inputValue));
                } else {
                  setSubject(newValue);
                }
              }}
              renderOption={(props, option) => (
                <Box component="li" {...props} key={option.id ?? option.inputValue}>
                  {option.isNew ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#6C5CE7' }}>
                      <AddIcon fontSize="small" />
                      <Typography variant="body2">Add "{option.inputValue}"</Typography>
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: option.color }} />
                      {option.name}
                    </Box>
                  )}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select or add"
                  error={!!errors.subject}
                  helperText={errors.subject}
                  sx={{ mt: 0.5 }}
                />
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
                <MenuItem key={p} value={p}>{p}</MenuItem>
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
        <Button onClick={handleClose} variant="outlined">{createTaskModalText.cancelButton}</Button>
        <Button onClick={handleSave} variant="contained">{createTaskModalText.saveButton}</Button>
      </DialogActions>
    </Dialog>
  );
}