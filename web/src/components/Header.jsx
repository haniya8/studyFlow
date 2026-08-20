// components/Header.jsx
import { Box, Typography, IconButton, Avatar, Menu, MenuItem, Badge, Divider, Button } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationsContext';

export default function Header({ title }) {
  const [bellAnchorEl, setBellAnchorEl] = useState(null);
  const [avatarAnchorEl, setAvatarAnchorEl] = useState(null);
  const navigate = useNavigate();
  const bellMenuOpen = Boolean(bellAnchorEl);
  const avatarMenuOpen = Boolean(avatarAnchorEl);

  const { logout, currentUser } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification } = useNotifications();

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

  const handleNotificationClick = async (notification) => {
    if (!notification.read) {
      await markAsRead(notification.id);
    }
  };

  const handleDeleteNotification = async (event, id) => {
    event.stopPropagation();
    await deleteNotification(id);
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
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsNoneIcon />
          </Badge>
        </IconButton>

        <Menu anchorEl={bellAnchorEl} 
          open={bellMenuOpen} 
          onClose={handleBellMenuClose} 
          slotProps={{ sx: { width: 340, maxHeight: 420 } }}
        >
          
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, py: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              Notifications
            </Typography>
            {unreadCount > 0 && (
              <Button size="small" sx={{ textTransform: 'none' }} onClick={() => markAllAsRead()}>
                Mark all read
              </Button>
            )}
          </Box>
          <Divider />

          {notifications.length === 0 ? (
            <MenuItem disabled>No notifications yet.</MenuItem>
          ) : (
            notifications.map((notification) => (
              <MenuItem
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: 1,
                  bgcolor: notification.read ? 'transparent' : 'action.hover',
                  whiteSpace: 'normal',
                }}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: notification.read ? 400 : 600 }}>
                    {notification.message}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(notification.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  onClick={(event) => handleDeleteNotification(event, notification.id)}
                >
                  <DeleteOutlinedIcon fontSize="small" />
                </IconButton>
              </MenuItem>
            ))
          )}
        </Menu>

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

        <Avatar onClick={handleAvatarClick} sx={{ cursor: 'pointer' }}>
          {currentUser?.fullName?.charAt(0).toUpperCase()}
        </Avatar>

        <Menu anchorEl={avatarAnchorEl} open={avatarMenuOpen} onClose={handleAvatarMenuClose}>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}