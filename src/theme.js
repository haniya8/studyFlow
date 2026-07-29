import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3525CD', 
    },
  },
  typography: {
    fontFamily: '"Quicksand", "Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 600,
      fontSize: 24,
      lineHeight: '32px',
    },
    h6: {
      fontWeight: 700,
      fontSize: 12,
      lineHeight: '16px',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;