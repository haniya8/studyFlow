// import { createContext, useContext, useState, useCallback, useEffect } from 'react';
// import { useAuth } from './AuthContext';
// import { authFetch } from '../utils/api';

// const TasksContext = createContext(null);
// const TASKS_PATH = '/api/tasks';


// export function TasksProvider({ children }) {
//   const { currentUser } = useAuth();
//   const [loading, setLoading] = useState(true);
//   const [tasks, setTasks] = useState([]);

//   const fetchTasks = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await authFetch(TASKS_PATH);

//       if (!response.ok) throw new Error('Failed to fetch tasks');

//       const data = await response.json();
//       setTasks(data);

//     } catch (err) {
//       console.error('Failed to fetch tasks:', err);
//     } finally {
//       setLoading(false);
//     }
//   },[]);

//   useEffect(() => {
//     if (currentUser) {
//       fetchTasks();
//     } else {
//       setTasks([]);
//       setLoading(false);
//     }
//   }, [currentUser, fetchTasks]);


//   const addTask = useCallback(async(task) => {
//     try {
//           const response = await authFetch(TASKS_PATH, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(task),
//           });

//           const data = await response.json();
          
//           if(!response.ok){
//             return { success: false, error: data.error || 'Could not add task.' };
//           }

//           setTasks((prev) => [...prev, data]);
//           return { success: true };
//           } catch (err) {
//             console.error('Failed to add task:', err);
//             return { success: false, error: 'Could not reach the server.' };
//           }
//         }, []);


//   const deleteTask = useCallback(async(id) => {
//     try {
//           const response = await authFetch(`${TASKS_PATH}/${id}`, {
//             method: 'DELETE',
//           });
//       if (!response.ok) {
//         return { success: false, error: 'Could not delete task.' };
//       }

//       setTasks((prev) => prev.filter((t) => t.id !== id));
//       return { success: true };
//     } catch (err) {
//       console.error('Failed to delete task:', err);
//       return { success: false, error: 'Could not reach the server.' };
//     }
//   }, []);
    


//   const updateTask = useCallback(async(id, updates) => {
//     try {
//           const response = await authFetch(`${TASKS_PATH}/${id}`, {
//             method: 'PATCH',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(updates),
//           });

//       const data = await response.json();

//       if (!response.ok) {
//         return { success: false, error: data.error || 'Could not update task.' };
//       }

//       setTasks((prev) => prev.map((t) => (t.id === id ? data : t)));
//       return { success: true };
//     } catch (err) {
//       console.error('Failed to update task:', err);
//       return { success: false, error: 'Could not reach the server.' };
//     }
//   }, []);
    

//   const toggleTaskComplete = useCallback(async(id) => {
//     const current = tasks.find((t) => t.id === id);
//   if (!current) return { success: false, error: 'Task not found.' };

//   return updateTask(id, { completed: !current.completed });
// }, [tasks, updateTask]);

//   return (
//     <TasksContext.Provider value={{ tasks, loading, addTask, deleteTask, toggleTaskComplete, updateTask }}>
//       {children}
//     </TasksContext.Provider>
//   );
// }

// export function useTasks() {
//   const ctx = useContext(TasksContext);
//   if (!ctx) throw new Error('useTasks must be used within a TasksProvider');
//   return ctx;
// }