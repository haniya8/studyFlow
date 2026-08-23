import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from './AuthContext';
import { authFetch } from '../utils/api';

const SUBJECTS_PATH = '/api/subjects';

export function useSubjects() {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

  const subjectsQuery  = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
        const response = await authFetch(TASKS_PATH);
        if (!response.ok) throw new Error('Failed to fetch tasks');
        return response.json();
    },
    enabled: !!currentUser, // only fetch when logged in — replaces the manual if/else branch
    });