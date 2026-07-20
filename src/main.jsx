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
import { SubjectsProvider } from './context/SubjectsContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SubjectsProvider>
        <RouterProvider router={router} />
      </SubjectsProvider>
    </ThemeProvider>
  </StrictMode>,
)