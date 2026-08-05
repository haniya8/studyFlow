import { Box, Typography, Switch } from "@mui/material";
import Card from "../Card";
import PaletteIcon from '@mui/icons-material/Palette';
import { useThemeMode } from '../../contexts/ThemeContext';


function AppearanceCard() {
  const { mode, toggleMode } = useThemeMode();

  return (
    <Card>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
        <PaletteIcon color="primary" fontSize="small" />
        <Typography variant="h5">Appearance</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        <Typography color="text.secondary">
          {mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
        </Typography>
        <Switch checked={mode === 'dark'} onChange={toggleMode} />
      </Box>
    </Card>
  );
}

export default AppearanceCard;