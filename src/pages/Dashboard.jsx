import { Box, Grid, Typography } from '@mui/material';
import StatCard from '../components/StatCard';
import ChecklistIcon from '@mui/icons-material/Checklist';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import ErrorIcon from '@mui/icons-material/Error';
import { dashboardPageText, statCardsData, iconMap } from '../constants/DashboardConstants';

function Dashboard() {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        {dashboardPageText.heading}
      </Typography>

      <Grid container spacing={2}>
        {statCardsData.map((card) => (
          <Grid key={card.key} size={{ xs: 6, sm: 3 }}>
            <StatCard icon={iconMap[card.icon]} label={card.label} count={card.count} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Dashboard;