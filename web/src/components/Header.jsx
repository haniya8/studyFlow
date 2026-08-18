// components/Header.jsx
import { Box, Typography, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
export default function Header({ title }) {
  const [bellAnchorEl, setBellAnchorEl] = useState(null);
  const [avatarAnchorEl, setAvatarAnchorEl] = useState(null);
  const navigate = useNavigate();
  const bellMenuOpen = Boolean(bellAnchorEl);
  const avatarMenuOpen = Boolean(avatarAnchorEl);

  const { logout, currentUser } = useAuth();

  const handleBellClick = (event) => {
    setBellAnchorEl(event.currentTarget);
  };

  const handleBellMenuClose = () => {
    setBellAnchorEl(null);
  };

  const handleAvatarClick = (event) => {
    setAvatarAnchorEl(event.currentTarget);
  };

  const handleAvatarMenuClose = () => {
    setAvatarAnchorEl(null);
  };

  const handleLogout = () => {
    handleAvatarMenuClose();
    logout();
    navigate('/login');
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: '32px',
        py: 2,
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
        <IconButton onClick={handleBellClick} sx={{ cursor: 'pointer' }}>
          <NotificationsNoneIcon />
        </IconButton>

        <Menu anchorEl={bellAnchorEl} open={bellMenuOpen} onClose={handleBellMenuClose}>
          <MenuItem onClick={handleBellMenuClose}>No Notifications yet.</MenuItem>
        </Menu>

        <Avatar onClick={handleAvatarClick} sx={{ cursor: 'pointer' }}>
          {currentUser?.fullName?.charAt(0).toUpperCase()}
        </Avatar>
        
        {currentUser?.fullName && (
          <Typography
            sx={{
              fontFamily: 'Quicksand',
              fontWeight: 500,
              fontSize: 14,
              color: 'text.secondary',
            }}
          >
            {currentUser.fullName}
          </Typography>
        )}

        

        <Menu anchorEl={avatarAnchorEl} open={avatarMenuOpen} onClose={handleAvatarMenuClose}>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}