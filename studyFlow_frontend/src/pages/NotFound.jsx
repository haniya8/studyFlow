// pages/NotFound.jsx
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { backButton, errorCode, errorMsg1, errorMsg2 } from '../constants/NotFoundConstants';
export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        textAlign: 'center',
        p: 4,
      }}
    >
      <Typography variant="h1" sx={{ fontWeight: 700, mb: 1 }}>
        {errorCode}
      </Typography>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {errorMsg1}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {errorMsg2}
      </Typography>
      <Button variant="contained" onClick={() => navigate('/')}>
        {backButton}
      </Button>
    </Box>
  );
}