// components/Sidebar.jsx
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ChecklistIcon from '@mui/icons-material/Checklist';
import SettingsIcon from '@mui/icons-material/Settings';

import { sidebarText } from '../constants/LayoutConstants';

const navItems = [
  { label: 'Dashboard', path: '/', icon: <DashboardIcon /> },
  { label: 'Tasks', path: '/tasks', icon: <ChecklistIcon /> },
  { label: 'Settings', path: '/settings', icon: <SettingsIcon />}
];

export default function Sidebar() {
  return (
    <Box
      sx={{
        width: 280,
        flexShrink:0,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid',
        borderColor: 'divider',
        p: 2,
      }}
    >
      <Box sx={{ width: '100%', p: 2, textAlign: 'left' }}>
        {/* Logo */}
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
          {sidebarText.appName}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
          {sidebarText.workspaceLabel}
        </Typography>
      </Box>

      {/* Nav links */}
      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            end={item.path === '/'}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              '&.active': {
                bgcolor: 'primary.light',
                color: 'primary.main',
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}