import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { authFetch } from '../utils/api';

const SubjectsContext = createContext(null);
const SUBJECTS_PATH = '/api/subjects';

export function SubjectsProvider({ children }) {
  const { currentUser } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubjects = useCallback(async () => {
    setLoading(true);
    try {
      const response = await authFetch(SUBJECTS_PATH);
      if (!response.ok) throw new Error('Failed to fetch subjects');
      const data = await response.json();
      setSubjects(data);
    } catch (err) {
      console.error('Failed to fetch subjects:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchSubjects();
    } else {
      setSubjects([]);
      setLoading(false);
    }
  }, [currentUser, fetchSubjects]);

  const addSubject = useCallback(async ({ name, color }) => {
    try {
      const response = await authFetch(SUBJECTS_PATH, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, color }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Could not add subject.' };
      }

      setSubjects((prev) => [...prev, data]);
      return { success: true, subject: data };
    } catch (err) {
      console.error('Failed to add subject:', err);
      return { success: false, error: 'Could not reach the server.' };
    }
  }, []);

  const deleteSubject = useCallback(async (id) => {
    try {
      const response = await authFetch(`${SUBJECTS_PATH}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        return { success: false, error: 'Could not delete subject.' };
      }

      setSubjects((prev) => prev.filter((s) => s.id !== id));
      return { success: true };
    } catch (err) {
      console.error('Failed to delete subject:', err);
      return { success: false, error: 'Could not reach the server.' };
    }
  }, []);

  return (
    <SubjectsContext.Provider value={{ subjects, loading, addSubject, deleteSubject }}>
      {children}
    </SubjectsContext.Provider>
  );
}

export function useSubjects() {
  const ctx = useContext(SubjectsContext);
  if (!ctx) throw new Error('useSubjects must be used within a SubjectsProvider');
  return ctx;
}