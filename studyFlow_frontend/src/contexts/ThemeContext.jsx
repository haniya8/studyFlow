import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import getTheme from '../theme';

const ThemeContext = createContext(null);

const STORAGE_KEY = 'studyflow.themeMode';

function loadMode() {
  try {
    return localStorage.getItem(STORAGE_KEY) || 'light';
  } catch {
    return 'light';
  }
}

export function AppThemeProvider({ children }) {
  const [mode, setMode] = useState(loadMode);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useThemeMode() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeMode must be used within an AppThemeProvider');
  return ctx;
}