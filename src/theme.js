import { createTheme } from '@mui/material/styles';

const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#3525CD',
        light: '#EDE9FE',
      },
      background: mode === 'dark'
        ? { default: '#121212', paper: '#1E1E1E' }
        : { default: '#FAFAFC', paper: '#FFFFFF' },
    },
    typography: {
      fontFamily: '"Quicksand", "Roboto", "Helvetica", "Arial", sans-serif',
      h5: { fontWeight: 600, fontSize: 24, lineHeight: '32px' },
      h6: { fontWeight: 700, fontSize: 12, lineHeight: '16px' },
    },
    components: {
      MuiButton: {
        styleOverrides: { root: { textTransform: 'none' } },
      },
    },
  });

export default getTheme;