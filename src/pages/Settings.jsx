import { Typography } from "@mui/material";
import Card from "../components/Card";
import PaletteIcon from '@mui/icons-material/Palette';

function AppearanceCard() {
  return (
    <Card>
      <Typography variant="h5">
        Appearance
      </Typography>
      <Typography>
        Switch between Light and Dark Themes
      </Typography>
    </Card>
  );
}

export default AppearanceCard;