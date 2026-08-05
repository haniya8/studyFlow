import { createContext, useContext, useState, useCallback } from 'react';

const REMEMBERED_SESSION_DURATION_MS = 60 * 60 * 1000; // 60 minutes

const AuthContext = createContext(null);

const USERS_KEY = 'studyflow.users';
const CURRENT_USER_KEY = 'studyflow.currentUser';

function loadUsers() {
  try {
    const stored = localStorage.getItem(USERS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    console.error('Failed to load users:', err);
    return [];
  }
}

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

  const signup = useCallback(({ fullName, email, password }) => {
    const users = loadUsers();
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    const newUser = { id: Date.now(), fullName, email, password };
    const updatedUsers = [...users, newUser];
    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

    
    return { success: true };
  }, []);

  const login = useCallback(({ email, password, rememberMe }) => {
    const users = loadUsers();
    const match = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!match) {
      return { success: false, error: 'Invalid email or password.' };
    }

    const sessionUser = { id: match.id, fullName: match.fullName, email: match.email };

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