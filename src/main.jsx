// main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router.jsx'

import '@fontsource/quicksand/400.css';
import '@fontsource/quicksand/500.css';
import '@fontsource/quicksand/600.css';
import '@fontsource/quicksand/700.css';
import theme from './theme.js'
import { ThemeProvider, CssBaseline } from '@mui/material';
import { SubjectsProvider } from './contexts/SubjectsContext.jsx';
import { TasksProvider } from './contexts/TasksContext.jsx'
import { AuthProvider } from './contexts/AuthContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SubjectsProvider>
        <TasksProvider>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </TasksProvider>
      </SubjectsProvider>
    </ThemeProvider>
  </StrictMode>,
)