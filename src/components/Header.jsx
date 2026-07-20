// components/Header.jsx
import { Box, Typography, IconButton, Avatar } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

export default function Header({ title }) {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: '32px',
        py: '16px',
        mb: 3,
        borderBottom: '1px solid',
        borderColor: 'divider',

      }}
    >
      <Typography
        sx={{
          fontFamily: 'Quicksand',
          fontWeight: 600,
          fontSize: 24,
          lineHeight: '32px',
          letterSpacing: 0,
        }}
      >
        {title}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton>
          <NotificationsNoneIcon />
        </IconButton>
        <Avatar sx={{ width: 40, height: 40 }} />
      </Box>
    </Box>
  );
}