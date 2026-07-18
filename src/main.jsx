import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import { router } from './routes/router.jsx'

import '@fontsource/quicksand/400.css'; // regular
import '@fontsource/quicksand/500.css'; // medium
import '@fontsource/quicksand/600.css'; // semi-bold
import '@fontsource/quicksand/700.css'; // bold
import theme from './theme.js'
import { ThemeProvider, CssBaseline } from '@mui/material';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
