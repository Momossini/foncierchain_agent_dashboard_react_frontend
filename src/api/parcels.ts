import apiClient from './client';
import type { ApiResponse, Parcel } from '@/types';

export const parcelsApi = {
  getAll: async (params?: any) => {
    const response = await apiClient.get<ApiResponse<Parcel[]>>('/parcels', { params });
    return response.data;
  },
  getById: async (id: string) => {
    const response = await apiClient.get<ApiResponse<Parcel>>(`/parcels/${id}`);
    return response.data;
  },
  getByUid: async (uid: string) => {
    const response = await apiClient.get<ApiResponse<Parcel>>(`/parcels/by-uid/${uid}`);
    return response.data;
  },
  search: async (query: string) => {
    const response = await apiClient.get<ApiResponse<Parcel[]>>(`/parcels/search`, { params: { q: query } });
    return response.data;
  },
  create: async (data: any) => {
    const response = await apiClient.post<ApiResponse<Parcel>>('/parcels', data);
    return response.data;
  },
  validate: async (data: any) => {
    const response = await apiClient.post<ApiResponse<any>>('/parcels/validate', data);
    return response.data;
  },
};
