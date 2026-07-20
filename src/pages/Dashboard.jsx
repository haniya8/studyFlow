import { Box, Grid, Stack } from '@mui/material';
import StatCard from '../components/dashboard/StatCard';
import OverallProgressCard from '../components/dashboard/OverallProgressCard';
import RecentlyAddedCard from '../components/dashboard/RecentlyAddedCard';
import UpcomingDeadlinesCard from '../components/dashboard/UpcomingDeadlinesCard';
import SubjectsCard from '../components/dashboard/SubjectsCard';
import {
  statCardsData,
  iconMap,
  recentlyAddedData,
  upcomingDeadlinesData,
} from '../constants/DashboardConstants';

function Dashboard() {
  return (
    <Box>
      <Grid container spacing={2}>
        {statCardsData.map((card) => (
          <Grid key={card.key} size={{ xs: 6, sm: 3 }}>
            <StatCard icon={iconMap[card.icon]} label={card.label} count={card.count} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={2}>
            <OverallProgressCard percentage={67} message="You are making steady progress this week. Keep up the momentum to finish your remaining tasks." />
            <UpcomingDeadlinesCard tasks={upcomingDeadlinesData} onViewAll={() => {}} />
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={2}>
            <RecentlyAddedCard items={recentlyAddedData} />
            <SubjectsCard onManageSubjects={() => {}} />
          </Stack>
        </Grid>
      </Grid>

    </Box>
  );
}

export default Dashboard;
