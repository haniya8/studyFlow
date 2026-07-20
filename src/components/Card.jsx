// components/Card.jsx
import { Paper } from '@mui/material';

export default function Card({ children, sx }) {
  return (
    <Paper
      variant="outlined"
      elevation={0}
      sx={{
        borderRadius: '12px',
        p: 3,
        bgcolor: '#fcf8ff',
        border: '1px solid',
        borderColor: '#EDEDF5', // subtle, cool-toned border matching the design
        ...sx,
      }}
    >
      {children}
    </Paper>
  );
}