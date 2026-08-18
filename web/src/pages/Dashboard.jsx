import { Box, Grid, Stack } from '@mui/material';
import StatCard from '../components/dashboard/StatCard';
import OverallProgressCard from '../components/dashboard/OverallProgressCard';
import RecentlyAddedCard from '../components/dashboard/RecentlyAddedCard';
import UpcomingDeadlinesCard from '../components/dashboard/UpcomingDeadlinesCard';
import { statCardsData, iconMap, getOverallProgress } from '../constants/DashboardConstants';
import { useTasks } from '../contexts/TasksContext';
import { dashboardStyles } from '../styles/dashboard.styles';
import { formatRelativeTime } from '../utils/helper';
import { formatDueDateLabel } from '../utils/formatDueDateLabel';
import { useSubjects } from '../contexts/SubjectsContext';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { tasks } = useTasks();
  const { subjects } = useSubjects();
  const navigate = useNavigate();


  const recentlyAddedItems = [...tasks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3)
    .map((task) => {
      const subject = subjects.find((s) => s.id === task.subjectId);
      return {
        id: task.id,
        title: task.title,
        tag: subject?.name || 'No subject',
        tagColor: subject?.color,
        time: formatRelativeTime(task.createdAt),
      };
    });

  const upcomingTasks = [...tasks]
    .filter((t) => !t.completed)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 5)
    .map((task) => {
      const { dueLabel, urgent } = formatDueDateLabel(task.dueDate);
      return { ...task, dueLabel, urgent };
    });

  const { percentage, message } = getOverallProgress(tasks);

  return (
    <Box>
      <Grid container spacing={2}>
        {statCardsData(tasks).map((card) => (
          <Grid key={card.key} size={{ xs: 6, sm: 3 }}>
            <StatCard icon={iconMap[card.icon]} label={card.label} count={card.count} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} sx={dashboardStyles.sectionSpacing}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={2}>
            <OverallProgressCard percentage={percentage} message={message} />
            <UpcomingDeadlinesCard tasks={upcomingTasks} onViewAll= {() => navigate('/tasks')} />
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={2}>
            <RecentlyAddedCard items={recentlyAddedItems} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;