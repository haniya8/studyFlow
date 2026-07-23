import { useState, useEffect } from 'react';
import { Box, Typography, Chip, Grid, Button, Paper, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import TaskCard from '../components/TaskCard';
import CreateTaskModal from '../components/CreateTaskModal';
import { statuses, tasksPageText } from '../constants/MyTasksPageConstants';
import { useTasks } from '../contexts/TasksContext';
import { useSubjects } from '../contexts/SubjectsContext';
export default function Tasks() {
  const { tasks } = useTasks();
  const { subjects } = useSubjects();

  const [modalOpen, setModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const SUBJECT_KEY = 'studyflow.tasks.subjectFilter';
  const STATUS_KEY = 'studyflow.tasks.statusFilter';

  const [subjectFilter, setSubjectFilter] = useState(
    () => sessionStorage.getItem(SUBJECT_KEY) || 'All'
  );
  const [statusFilter, setStatusFilter] = useState(
    () => sessionStorage.getItem(STATUS_KEY) || 'All'
  );

  const filteredTasks = tasks.filter((task) => {
    const matchesSubject = subjectFilter === 'All' || task.subjectId === subjectFilter;
    const matchesStatus = 
      statusFilter === 'All' || (statusFilter === 'Done' ? task.completed : !task.completed);
    const matchesSearch = task.title.toLowerCase().includes(searchText.toLowerCase());
    return matchesSubject && matchesStatus && matchesSearch;
  });

  useEffect(() => {
    sessionStorage.setItem(SUBJECT_KEY, subjectFilter);
  }, [subjectFilter]);

  useEffect(() => {
    sessionStorage.setItem(STATUS_KEY, statusFilter);
  }, [statusFilter]);


  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>{tasksPageText.heading}</Typography>
          <Typography variant="body2" color="text.secondary">
            {tasksPageText.subheading}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Paper
            variant="outlined"
            sx={{ display: 'flex', alignItems: 'center', px: 1.5, py: 0.5, borderRadius: 5, width: 240 }}
          >
            <SearchIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
            <InputBase
              placeholder="Search tasks..."
              fullWidth
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Paper>

          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setModalOpen(true)}>
            {tasksPageText.createTaskButton}
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2">{tasksPageText.subjectLabel}</Typography>
          <Chip
            label="All"
            size="small"
            onClick={() => setSubjectFilter('All')}
            color={subjectFilter === 'All' ? 'primary' : 'default'}
          />

          {subjects.map((s) => (
            <Chip
              key = {s.id}
              label= {s.name}
              size="small"
              onClick={() => setSubjectFilter(s.id)}
              color={subjectFilter === s.id ? 'primary' : 'default'}
            />
          ))}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2">{tasksPageText.statusLabel}</Typography>
          {statuses.map((s) => (
            <Chip
              key={s}
              label={s}
              size="small"
              onClick={() => setStatusFilter(s)}
              color={statusFilter === s ? 'primary' : 'default'}
            />
          ))}
        </Box>
      </Box>

      <Grid container spacing={2}>
        {filteredTasks.map((task) => (
          <Grid key={task.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <TaskCard task={task} />
          </Grid>
        ))}
      </Grid>

      <CreateTaskModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </Box>
  );
}