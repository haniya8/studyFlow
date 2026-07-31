// OverallProgressCard.jsx
import { Box, Typography } from '@mui/material';
import Card from '../Card';
import { ProgressCircle } from './ProgressCircle';

const cardStyle = { p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: 3 };

function OverallProgressCard({ percentage = 0, message }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <Card sx={{ ...cardStyle }}>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="h5" fontWeight={600}>
          Overall Progress
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ mt: 1 }}>
          {message}
        </Typography>
      </Box>

      <Box sx={{ position: 'relative', width: 100, height: 100, flexShrink: 0, ml: 3 }}>
        <ProgressCircle radius={radius} circumference={circumference} offset={offset} />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h6" sx={{ color: '#242323' }} fontWeight={700}>
            {percentage}%
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

export default OverallProgressCard;