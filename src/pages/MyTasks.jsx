import { useState } from 'react';
import { Box, Typography, Chip, Grid, Button, Paper, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import TaskCard from '../components/TaskCard';
import CreateTaskModal from '../components/CreateTaskModal';
import { sampleTasks } from '../constants/sampleTasks';
import { filterSubjects, statuses, tasksPageText } from '../constants/MyTasksPageConstants';

export default function Tasks() {
  const [modalOpen, setModalOpen] = useState(false);
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchText, setSearchText] = useState('');

  const filteredTasks = sampleTasks.filter((task) => {
    const matchesSubject = subjectFilter === 'All' || task.subject === subjectFilter;
    const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
    const matchesSearch = task.title.toLowerCase().includes(searchText.toLowerCase());
    return matchesSubject && matchesStatus && matchesSearch;
  });

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
          {filterSubjects.map((s) => (
            <Chip
              key={s}
              label={s}
              size="small"
              onClick={() => setSubjectFilter(s)}
              color={subjectFilter === s ? 'primary' : 'default'}
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