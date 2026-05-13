import apiClient from './client';
import type { ApiResponse, AuthUser, LoginResponse } from '@/types';

export const authApi = {
  login: async (credentials: any) => {
    const response = await apiClient.post<ApiResponse<LoginResponse>>('/auth/login', credentials);
    return response.data;
  },
  getMe: async () => {
    const response = await apiClient.get<ApiResponse<AuthUser>>('/auth/me');
    return response.data;
  },
  refresh: async () => {
    const response = await apiClient.post<ApiResponse<LoginResponse>>('/auth/refresh');
    return response.data;
  },
};
