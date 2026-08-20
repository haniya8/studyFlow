//web/src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router.jsx';
import '@fontsource/quicksand/400.css';
import '@fontsource/quicksand/500.css';
import '@fontsource/quicksand/600.css';
import '@fontsource/quicksand/700.css';
import { AppThemeProvider } from './contexts/ThemeContext';
import { SubjectsProvider } from './contexts/SubjectsContext';
import { TasksProvider } from './contexts/TasksContext';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationsProvider } from './contexts/NotificationsContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppThemeProvider>
      <AuthProvider>
        <SubjectsProvider>
          <TasksProvider>
            <NotificationsProvider>
              <RouterProvider router={router} />
            </NotificationsProvider>
          </TasksProvider>
        </SubjectsProvider>
      </AuthProvider>
    </AppThemeProvider>
  </StrictMode>,
);