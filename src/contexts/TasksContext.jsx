import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { getNextId } from '../utils/getNextId';

const defaultTasks = [
  { id: 1, title: 'Calculus Assignment', subjectId: 1, priority: 'Medium Priority', dueDate: '2026-08-01', completed: false },
];

const STORAGE_KEY = 'studyflow.tasks';

const TasksContext = createContext(null);

function loadTasks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultTasks;
  } catch (err) {
    console.error('Failed to load tasks from storage:', err);
    return defaultTasks;
  }
}

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState(loadTasks);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (err) {
      console.error('Failed to save tasks to storage:', err);
    }
  }, [tasks]);

  const addTask = useCallback((task) => {
    const newTask = { id: getNextId(tasks), completed: false, ...task };
    setTasks((prev) => [...prev, newTask]);
    return newTask;
  }, []);

  const removeTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const updateTask = useCallback((id, updates) => {
  setTasks((prev) =>
    prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
  );
  }, []);

  const toggleTaskComplete = useCallback((id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }, []);

  return (
    <TasksContext.Provider value={{ tasks, addTask, removeTask, toggleTaskComplete, updateTask }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error('useTasks must be used within a TasksProvider');
  return ctx;
}