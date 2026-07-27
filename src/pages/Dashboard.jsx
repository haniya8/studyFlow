import { Box, Grid, Stack } from '@mui/material';
import StatCard from '../components/dashboard/StatCard';
import OverallProgressCard from '../components/dashboard/OverallProgressCard';
import RecentlyAddedCard from '../components/dashboard/RecentlyAddedCard';
import UpcomingDeadlinesCard from '../components/dashboard/UpcomingDeadlinesCard';
import SubjectsCard from '../components/dashboard/SubjectsCard';
import {
  statCardsData, iconMap, OverallProgressCardText } from '../constants/DashboardConstants';
import { useTasks } from '../contexts/TasksContext';
import {sectionSpacingSx} from '../styles/dashboardStyles'
import { formatRelativeTime } from '../utils/formatRelativeTime';
import { useSubjects } from '../contexts/SubjectsContext';

function Dashboard() {
  const {tasks} = useTasks();
  const { subjects } = useSubjects();

  const recentlyAddedItems = [...tasks]
    .sort((a, b) => b.createdAt - a.createdAt)
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
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);
  return (
    <Box>
      <Grid container spacing={2}>
        {statCardsData(tasks).map((card) => (
          <Grid key={card.key} size={{ xs: 6, sm: 3 }}>
            <StatCard icon={iconMap[card.icon]} label={card.label} count={card.count} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={2}>
            <OverallProgressCard percentage={67} message={OverallProgressCardText.message} />
            <UpcomingDeadlinesCard tasks={upcomingTasks} onViewAll={() => {}} />
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={2}>
            <RecentlyAddedCard items={recentlyAddedItems} />
            <SubjectsCard onManageSubjects={() => {}} />
          </Stack>
        </Grid>
      </Grid>

    </Box>
  );
}

export default Dashboard;
