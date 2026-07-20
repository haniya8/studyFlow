import { Typography, Box, Chip, Stack } from '@mui/material';
import Card from '../Card';

const tagColors = {
  Draft: { bg: '#F1F0FE', color: '#6C5CE7' },
  Social: { bg: '#FDEDEE', color: '#E74C3C' },
  Math: { bg: '#EAF6EE', color: '#27AE60' },
};

function RecentlyAddedCard({ items = [] }) {
  return (
    <Card sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
        Recently Added
      </Typography>

      <Stack spacing={2}>
        {items.map((item, index) => (
          <Box key={item.id} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, py :2, 
              borderBottom: index < items.length - 1 ? '1px solid' : 'none',
              borderColor: 'divider',
          }}>
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#6C5CE7', mt: 1 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2" fontWeight={500}>
                {item.title}
              </Typography>
            </Box>
            <Chip
              label={item.tag}
              size="small"
              sx={{
                bgcolor: tagColors[item.tag]?.bg || '#F1F0FE',
                color: tagColors[item.tag]?.color || '#6C5CE7',
                fontWeight: 600,
                height: 22,
              }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ minWidth: 60, textAlign: 'right' }}>
              {item.time}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Card>
  );
}

export default RecentlyAddedCard;