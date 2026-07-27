// components/dashboard/ManageSubjectsDialog.jsx
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Typography, IconButton, Button, TextField } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import { useSubjects } from '../../contexts/SubjectsContext';
import { useState } from 'react';
import SubjectLabel from './SubjectLabel';

export default function ManageSubjectsDialog({ open, onClose }) {
  const { subjects, removeSubject, addSubject } = useSubjects();
  const [newSubject, setNewSubject] = useState('');

  const handleAdd = () => {
    if (!newSubject.trim()) return;
    addSubject(newSubject);
    setNewSubject('');
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

        {subjects.map((subject) => (
          <Box
            key={subject.id}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1 }}
          >
            <SubjectLabel subject={subject}/>
            <IconButton size="small" onClick={() => removeSubject(subject.id)}>
              <DeleteOutlineOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="contained">Done</Button>
      </DialogActions>
    </Dialog>
  );
}  