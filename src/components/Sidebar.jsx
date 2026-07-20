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

import DashboardIcon from '@mui/icons-material/DashboardOutlined';
import ChecklistIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';

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
        width: 250,
        flexShrink:0,
        height: '1459.2',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid',
        borderColor: 'divider',
        p: '24px',
      }}
    >
      <Box sx={{ width: '100%', p: 2, textAlign: 'left' }}>
        {/* Logo */}
        <Typography variant="h4" sx={{ letterSpacing: '-0.05em', color: 'primary.main', fontWeight: 700 }}>
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
              borderRadius: '9999px',
              px: 2,
              py: 1.5,
              mb: 0.5,
              '&.active': {
                bgcolor: '#E2DFFF',
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