import { useState, useEffect } from 'react';
import { Box, Typography, Chip, Grid, Button, Paper, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import TaskCard from '../components/tasksPage/TaskCard';
import CreateTaskModal from '../components/tasksPage/CreateTaskModal';
import { statuses, tasksPageText } from '../constants/MyTasksPageConstants';
import { myTasksStyles } from '../styles/MyTasks.styles';
import { useTasks } from '../hooks/useTasks';
import { useSubjects } from '../contexts/SubjectsContext';
import ManageSubjectsDialog from '../components/tasksPage/ManageSubjectsDialog';

const SUBJECT_KEY = 'taskSubjectFilter';
const STATUS_KEY = 'taskStatusFilter';

export default function Tasks() {
  const { tasks } = useTasks();
  const { subjects } = useSubjects();

  
  const [manageOpen, setManageOpen] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const [subjectFilter, setSubjectFilter] = useState(() => {
    const stored = sessionStorage.getItem(SUBJECT_KEY);
    if (!stored || stored === 'All') return 'All';
    return Number(stored);
  });
  const [statusFilter, setStatusFilter] = useState(
    () => sessionStorage.getItem(STATUS_KEY) || 'All'
  );

  const filteredTasks = tasks.filter((task) => {
    const matchesSubject = task.subjectId === subjectFilter || subjectFilter === 'All';
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
      <Box sx={myTasksStyles.headerRow}>
        <Box>
          <Typography variant="h4" sx={myTasksStyles.heading}>{tasksPageText.heading}</Typography>
          <Typography variant="body2" color="text.secondary">
            {tasksPageText.subheading}
          </Typography>
        </Box>

        <Box sx={myTasksStyles.searchAndButtonRow}>
          <Paper variant="outlined" sx={myTasksStyles.searchPaper}>
            <SearchIcon fontSize="small" sx={myTasksStyles.searchIcon} />
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

          <Button variant="outlined" onClick={()=>setManageOpen(true)} sx={{ textTransform: 'none', borderRadius: 2 }}>
            Manage Subjects
          </Button>
          
        </Box>
      </Box>

      <Box sx={myTasksStyles.filterRow}>
        <Box sx={myTasksStyles.filterGroup}>
          <Typography variant="body2">{tasksPageText.subjectLabel}</Typography>
          <Chip
            label="All"
            size="small"
            onClick={() => setSubjectFilter('All')}
            color={subjectFilter === 'All' ? 'primary' : 'default'}
          />
          {subjects.map((s) => (
            <Chip
              key={s.id}
              label={s.name}
              size="small"
              onClick={() => setSubjectFilter(s.id)}
              color={subjectFilter === s.id ? 'primary' : 'default'}
            />
          ))}
        </Box>

        <Box sx={myTasksStyles.filterGroup}>
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
      <ManageSubjectsDialog open={manageOpen} onClose={() => setManageOpen(false)} />
      <CreateTaskModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </Box>
  );
}