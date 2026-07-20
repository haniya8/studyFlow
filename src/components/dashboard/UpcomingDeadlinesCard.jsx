import { Typography, Box, Checkbox, Chip, Stack, Button } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SchoolIcon from '@mui/icons-material/School';
import Card from '../Card';

function UpcomingDeadlinesCard({ tasks = [], onViewAll }) {
  return (
    <Card sx={{ p: 3, borderRadius: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" fontWeight={600}>
          Upcoming Deadlines
        </Typography>
        <Button size="small" onClick={onViewAll} sx={{ textTransform: 'none' }}>
          View All
        </Button>
      </Box>

      <Stack spacing={2}>
        {tasks.map((task) => (
          <Box
            key={task.id}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              p: 2,
              border: '1px solid #eee',
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
              <Checkbox checked={task.completed} size="small" />
              <Box>
                <Typography variant="body2" fontWeight={600}>
                  {task.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                  <SchoolIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">
                    {task.course}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Chip
              icon={task.urgent ? undefined : <CalendarTodayIcon sx={{ fontSize: 12 }} />}
              label={task.dueLabel}
              size="small"
              sx={{
                bgcolor: task.urgent ? '#FDEDEE' : '#F5F5F7',
                color: task.urgent ? '#E74C3C' : 'text.secondary',
                fontWeight: 600,
              }}
            />
          </Box>
        ))}
      </Stack>
    </Card>
  );
}

export default UpcomingDeadlinesCard;