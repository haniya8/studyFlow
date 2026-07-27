// components/SubjectLabel.jsx
import { Box, Typography } from '@mui/material';

export default function SubjectLabel({ subject }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: subject.color }} />
      <Typography variant="body2">{subject.name}</Typography>
    </Box>
  );
}