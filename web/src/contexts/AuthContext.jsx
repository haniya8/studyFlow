//web/src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import {
  API_URL,
  authFetch,
  clearStoredToken,
  getStoredToken,
  storeToken,
} from '../utils/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      const token = getStoredToken();

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await authFetch('/api/auth/me');

        if (!response.ok) {
          clearStoredToken();
          setCurrentUser(null);
          return;
        }

        const data = await response.json();
        setCurrentUser(data.user);
      } catch (err) {
        console.error('Failed to restore session:', err);
        clearStoredToken();
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    }

    restoreSession();
  }, []);

  const signup = useCallback(async ({ fullName, email, password }) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Signup failed.' };
      }

      return { success: true };
    } catch (err) {
      console.error('Signup request failed:', err);
      return { success: false, error: 'Could not reach the server. Please try again.' };
    }
  }, []);

  const login = useCallback(async ({ email, password, rememberMe }) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Login failed.' };
      }

      storeToken(data.token, rememberMe);
      setCurrentUser(data.user);

      return { success: true };
    } catch (err) {
      console.error('Login request failed:', err);
      return { success: false, error: 'Could not reach the server. Please try again.' };
    }
  }, []);

  const logout = useCallback(() => {
    clearStoredToken();
    setCurrentUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
