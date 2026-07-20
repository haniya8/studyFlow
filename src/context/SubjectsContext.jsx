import { createContext, useContext, useState, useCallback } from 'react';

const SubjectsContext = createContext(null);

const defaultSubjects = [
  { id: 1, name: 'Mathematics', color: '#6C5CE7' },
  { id: 2, name: 'Biology', color: '#3498DB' },
  { id: 3, name: 'History', color: '#E74C3C' },
  { id: 4, name: 'Computer Science', color: '#8E44AD' },
];

const palette = ['#6C5CE7', '#3498DB', '#E74C3C', '#8E44AD', '#27AE60', '#F39C12', '#16A085'];

export function SubjectsProvider({ children }) {
  const [subjects, setSubjects] = useState(defaultSubjects);

  const addSubject = useCallback((name) => {
    const trimmed = name.trim();
    if (!trimmed) return null;

    // avoid duplicates (case-insensitive)
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