import { createContext, useContext, useState, useCallback } from 'react';

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
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    return stored ? JSON.parse(stored) : null;
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

    const sessionUser = { id: newUser.id, fullName: newUser.fullName, email: newUser.email };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
    setCurrentUser(sessionUser);

    return { success: true };
  }, []);

  const login = useCallback(({ email, password }) => {
    const users = loadUsers();
    const match = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!match) {
      return { success: false, error: 'Invalid email or password.' };
    }

    const sessionUser = { id: match.id, fullName: match.fullName, email: match.email };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
    setCurrentUser(sessionUser);

    return { success: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(CURRENT_USER_KEY);
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