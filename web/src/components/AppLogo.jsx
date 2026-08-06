import { Box, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import IconBadge from './IconBadge';
import InlineFlex from './InlineFlex';

export default function AppLogo({ sx }) {
  return (
    <InlineFlex gap={1.5} sx={sx}>
      <IconBadge icon={<SchoolIcon sx={{ color: '#fff', fontSize: 22 }} />} />
      <Box>
        <Typography variant="h5" sx={{ letterSpacing: '-0.05em', color: 'primary.main', fontWeight: 700, lineHeight: 1.1 }}>
          StudyFlow
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Academic Workspace
        </Typography>
      </Box>
    </InlineFlex>
  );
}