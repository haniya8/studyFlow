import { Typography, Box, Stack, Button } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useSubjects } from '../../contexts/SubjectsContext';
import Card from '../Card';
import ManageSubjectsDialog from './ManageSubjectsDialog';
import { useState } from 'react';
import SubjectLabel from './SubjectLabel';
function SubjectsCard() {
  const { subjects } = useSubjects();
  const [manageOpen, setManageOpen] = useState(false);

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
            <SubjectLabel subject={subject}/>
            <ChevronRightIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
          </Box>
        ))}
      </Stack>
      <Button fullWidth variant="outlined" onClick={()=>setManageOpen(true)} sx={{ textTransform: 'none', borderRadius: 2 }}>
        Manage Subjects
      </Button>
      <ManageSubjectsDialog open={manageOpen} onClose={() => setManageOpen(false)} />
    </Card>
  );
}

export default SubjectsCard;