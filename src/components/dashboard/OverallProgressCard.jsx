import { Box, Typography } from '@mui/material';
import Card from '../Card';

const cardStyle = { p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: 3 }

function OverallProgressCard({ percentage = 67, message}) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <Card sx={{ ...cardStyle}}>
      <Box sx={{ flex: 1, minWidth:0 }}>
        <Typography variant="h5" fontWeight={600}>
          Overall Progress
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {message}
        </Typography>
      </Box>

      <Box sx={{ position: 'relative', width: 100, height: 100, flexShrink: 0, ml: 3}}>
        <svg width={100} height={100} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} fill="#ffffff" stroke="#2a2a3a" strokeWidth="8" />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#6C5CE7"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h6" color="#fff" fontWeight={700}>
            {percentage}%
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

export default OverallProgressCard;