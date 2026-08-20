// components/tasksPage/ManageSubjectsDialog.jsx
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Typography, IconButton, Button, TextField } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import { useSubjects } from '../../contexts/SubjectsContext';
import { useState } from 'react';
import SubjectLabel from '../dashboard/SubjectLabel';
import CheckIcon from '@mui/icons-material/Check';

const SUBJECT_COLORS = [
  '#EF5350', // red
  '#FFA726', // orange
  '#FFCA28', // amber
  '#66BB6A', // green
  '#26C6DA', // cyan
  '#42A5F5', // blue
  '#5C6BC0', // indigo
  '#AB47BC', // purple
  '#EC407A', // pink
  '#8D6E63', // brown
];

export default function ManageSubjectsDialog({ open, onClose }) {
  const { subjects, deleteSubject, addSubject } = useSubjects();
  const [newSubject, setNewSubject] = useState('');
  const [selectedColor, setSelectedColor] = useState(SUBJECT_COLORS[0]);
  const [error, setError] = useState('');

  const handleAdd = async () => {
    if (!newSubject.trim()) return;

    const result = await addSubject({ name: newSubject.trim(), color: selectedColor });

    if (result.success) {
      setNewSubject('');
      setSelectedColor(SUBJECT_COLORS[0]);
      setError('');
    } else {
      setError(result.error || 'Could not add subject.');
    }
  };

  const handleDelete = async (id) => {
    const result = await deleteSubject(id);
  if (!result.success) {
    setError(result.error || 'Could not delete subject.');
  }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Manage Subjects</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            size="small"
            fullWidth
            placeholder="New subject name"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            variant="contained"
            onClick={handleAdd}
            disabled={!newSubject.trim()}
            sx={{ minWidth: 'auto', px: 2 }}
          >
            <AddIcon fontSize="small" />
          </Button>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {SUBJECT_COLORS.map((color) => (
            <Box
              key={color}
              onClick={() => setSelectedColor(color)}
              sx={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                bgcolor: color,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: selectedColor === color ? '2px solid' : '2px solid transparent',
                borderColor: selectedColor === color ? 'text.primary' : 'transparent',
                outline: '1px solid rgba(0,0,0,0.1)',
                outlineOffset: '1px',
              }}
            >
              {selectedColor === color && (
                <CheckIcon sx={{ fontSize: 16, color: '#fff' }} />
              )}
            </Box>
          ))}
        </Box>

        {error && (
          <Typography variant="caption" color="error" sx={{ display: 'block', mb: 1.5 }}>
            {error}
          </Typography>
        )}

        {subjects.map((subject) => (
          <Box
            key={subject.id}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1 }}
          >
            <SubjectLabel subject={subject}/>
            <IconButton size="small" onClick={() => handleDelete(subject.id)}>
              <DeleteOutlineOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={ () =>{
          setError('');
          onClose();
        }} 
        variant="contained"
        > Done
        </Button>

      </DialogActions>
    </Dialog>
  );
}  