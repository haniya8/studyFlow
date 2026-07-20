//StatCard.jsx
import Card from '../Card';
import { Typography, Box } from '@mui/material';

export default function StatCard({ icon, label, count }) {
  return (
    <Card sx={{ textAlign: 'left' }}>
      <Box >{icon}</Box>
      <Typography variant="body2" color="text.secondary" >{label}</Typography>
      <Typography variant="h5">{count}</Typography>
    </Card>
  );
}