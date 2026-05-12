import apiClient from './client';
import type { ApiResponse, Parcel } from '@/types';

export const transferApi = {
  transfer: async (parcelId: string, data: any) => {
    const response = await apiClient.post<ApiResponse<Parcel>>(`/parcels/${parcelId}/transfer`, data);
    return response.data;
  },
};
