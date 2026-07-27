// components/Sidebar.jsx
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/DashboardOutlined';
import ChecklistIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import AppLogo from './AppLogo';
import { sidebarText } from '../constants/LayoutConstants';

const navItems = [
  { label: 'Dashboard', path: '/app', icon: <DashboardIcon /> },
  { label: 'Tasks', path: '/app/tasks', icon: <ChecklistIcon /> },
  { label: 'Settings', path: '/app/settings', icon: <SettingsIcon /> },
];

export default function Sidebar() {
  return (
    <Box
      sx={{
        width: 280,
        flexShrink: 0,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid',
        borderColor: 'divider',
        p: '24px',
      }}
    >
      <Box sx={{ width: '100%', p: 2, textAlign: 'left' }}>
        <AppLogo />
      </Box>

      {/* Nav links */}
      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            end={item.path === '/app'}
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