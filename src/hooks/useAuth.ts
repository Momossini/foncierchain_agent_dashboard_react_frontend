import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/api/auth';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      if (response.success && response.data) {
        localStorage.setItem('token', response.data.accessToken);
        queryClient.invalidateQueries({ queryKey: ['currentUser'] });
        navigate('/dashboard');
      }
    },
  });

  const logout = () => {
    localStorage.removeItem('token');
    queryClient.clear();
    navigate('/login');
  };

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
    logout,
  };
};
