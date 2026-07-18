// components/Card.jsx
import { Paper } from '@mui/material';

export default function Card({ children, sx }) {
  return (
    <Paper 
        variant='outlined'
        sx={{ borderRadius: 3, p: 2, ...sx }} elevation={0}
    >
      {children}
    </Paper>
  );
}