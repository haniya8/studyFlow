// components/InlineFlex.jsx
import React from 'react';
import { Box } from '@mui/material';

export default function InlineFlex({ gap = 1, children, sx }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap, ...sx }}>
      {children}
    </Box>
  );
}