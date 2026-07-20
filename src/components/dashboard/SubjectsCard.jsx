import { Typography, Box, Stack, Button } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SettingsIcon from '@mui/icons-material/Settings';
import { useSubjects } from '../../context/SubjectsContext';
import Card from '../Card';

function SubjectsCard({ onManageSubjects }) {
  const { subjects } = useSubjects();

  return (
    <Card sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
        Subjects
      </Typography>
      <Stack spacing={1.5} sx={{ mb: 2 }}>
        {subjects.map((subject, index) => (
          <Box key={subject.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
              py: '12px', 
              borderBottom: index < subjects.length - 1 ? '1px solid' : 'none',
              borderColor: 'divider', cursor: 'pointer' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: subject.color }} />
              <Typography variant="body2">{subject.name}</Typography>
            </Box>
            <ChevronRightIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
          </Box>
        ))}
      </Stack>
      <Button fullWidth variant="outlined" startIcon={<SettingsIcon />} onClick={onManageSubjects} sx={{ textTransform: 'none', borderRadius: 2 }}>
        Manage Subjects
      </Button>
    </Card>
  );
}

export default SubjectsCard;