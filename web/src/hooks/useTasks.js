import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from './AuthContext';
import { authFetch } from '../utils/api';
import { AddTask } from '@mui/icons-material';

const TASKS_PATH = '/api/tasks';


export function useTasks() {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

  const tasksQuery  = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
        const response = await authFetch(TASKS_PATH);
        if (!response.ok) throw new Error('Failed to fetch tasks');
        return response.json();
    },
    enabled: !!currentUser, // only fetch when logged in — replaces the manual if/else branch
    });

    const addTaskMutation = useMutation({
        mutationFn: async (task) => {
            const response = await authFetch(TASKS_PATH, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task),
            });
            const data = await response.json();
             if (!response.ok) throw new Error(data.error || 'Could not add task.');
            return data;
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });

   const deleteTaskMutation = useMutation({
     mutationFn: async (id) => {
        const response = await authFetch(`${TASKS_PATH}/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Could not delete task.');
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['tasks']});
        },
   });

   const updateTaskMutation = useMutation({
    mutationFn: async ({id, updates}) => {
        const response = await authFetch(`${TASKS_PATH}/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates),
        });
        const data = await response.json();
        if (!response.ok) throw new Error('Could not update task.');
        return data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['tasks']});
        },
    });

  return {
    tasks: tasksQuery.data ?? [],
    loading: tasksQuery.isLoading,
    addTask: addTaskMutation.mutateAsync,
    deleteTask: deleteTaskMutation.mutateAsync,
    updateTask: (id, updates) => updateTaskMutation({id, updates}),
    toggleTaskComplete: (id) => {
        const task = tasksQuery.data?.find((t) => t.id == id);
        if (!task) return;
        return updateTaskMutation.mutateAsync({ id, updates: { completed: !task.completed }});
    },
  };
}
