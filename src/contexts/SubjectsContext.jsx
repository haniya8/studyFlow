import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const defaultSubjects = [
  { id: 1, name: 'Mathematics', color: '#6C5CE7' },
];

const palette = ['#6C5CE7', '#3498DB', '#E74C3C', '#8E44AD', '#27AE60', '#F39C12', '#16A085'];

const STORAGE_KEY = 'studyflow.subjects';

const SubjectsContext = createContext(null);

function loadSubjects() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultSubjects;
  } catch (err) {
    console.error('Failed to load subjects from storage:', err);
    return defaultSubjects;
  }
}

export function SubjectsProvider({ children }) {
  const [subjects, setSubjects] = useState(loadSubjects);

  // persist to localStorage any time subjects changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects));
    } catch (err) {
      console.error('Failed to save subjects to storage:', err);
    }
  }, [subjects]);

  const addSubject = useCallback((name) => {
    const trimmed = name.trim();
    if (!trimmed) return null;

    const existing = subjects.find((s) => s.name.toLowerCase() === trimmed.toLowerCase());
    if (existing) return existing;

    const newSubject = {
      id: Date.now(),
      name: trimmed,
      color: palette[subjects.length % palette.length],
    };
    setSubjects((prev) => [...prev, newSubject]);
    return newSubject;
  }, [subjects]);

  const removeSubject = useCallback((id) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  }, []);

  return (
    <SubjectsContext.Provider value={{ subjects, addSubject, removeSubject }}>
      {children}
    </SubjectsContext.Provider>
  );
}

export function useSubjects() {
  const ctx = useContext(SubjectsContext);
  if (!ctx) throw new Error('useSubjects must be used within a SubjectsProvider');
  return ctx;
}