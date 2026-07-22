import { Box } from '@mui/material';
import { iconBadgeStyle } from '../styles/iconBadge'

export default function IconBadge({ icon, bg, size, sx }) {
  return <Box sx={{ ...iconBadgeStyle(bg, size), ...sx }}>{icon}</Box>;
}