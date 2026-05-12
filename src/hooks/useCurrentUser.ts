import { useQuery } from '@tanstack/react-query';
import { authApi } from '@/api/auth';

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: authApi.getMe,
    enabled: !!localStorage.getItem('token'),
    select: (response) => response.data,
  });
};
