// components/Header.jsx
import { Box, Typography, IconButton, Avatar } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

export default function Header({ title }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 3,
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        {title}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton>
          <NotificationsNoneIcon />
        </IconButton>
        <Avatar sx={{ width: 32, height: 32 }} />
      </Box>
    </Box>
  );
}