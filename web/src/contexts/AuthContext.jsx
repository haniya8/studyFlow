//web/src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useCallback } from 'react';

const REMEMBERED_SESSION_DURATION_MS = 60 * 60 * 1000; // 60 minutes

const AuthContext = createContext(null);

const USERS_KEY = 'studyflow.users';
const CURRENT_USER_KEY = 'studyflow.currentUser';

function loadCurrentUser() {
  try {
    // Check sessionStorage first (non-remembered session takes priority within this tab),
    // then fall back to localStorage (remembered session).
    const sessionStored = sessionStorage.getItem(CURRENT_USER_KEY);
    if (sessionStored) return JSON.parse(sessionStored);

    const localStored = localStorage.getItem(CURRENT_USER_KEY);
    if (!localStored) return null;
    const parsed = JSON.parse(localStored);
    if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
      localStorage.removeItem(CURRENT_USER_KEY);
      return null;
    }
    return parsed;




  } catch (err) {
    console.error('Failed to load current user:', err);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(loadCurrentUser);

  const signup = useCallback(async ({ fullName, email, password }) => {
  try {
    const response = await fetch('http://localhost:4000/api/auth/signup', {
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
    const response = await fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Login failed.' };
    }

    const sessionUser = data.user;

    if (rememberMe) {
      const rememberedUser = { ...sessionUser, expiresAt: Date.now() + REMEMBERED_SESSION_DURATION_MS };
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(rememberedUser));
      sessionStorage.removeItem(CURRENT_USER_KEY);
      setCurrentUser(rememberedUser);
    } else {
      sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
      localStorage.removeItem(CURRENT_USER_KEY);
      setCurrentUser(sessionUser);
    }

    return { success: true };
  } catch (err) {
    console.error('Login request failed:', err);
    return { success: false, error: 'Could not reach the server. Please try again.' };
  }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(CURRENT_USER_KEY);
    sessionStorage.removeItem(CURRENT_USER_KEY);
    setCurrentUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}