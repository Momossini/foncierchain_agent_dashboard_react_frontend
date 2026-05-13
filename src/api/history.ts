import apiClient from './client';
import type { ApiResponse, ParcelHistoryItem } from '@/types';

export const historyApi = {
  getHistory: async (parcelId: string) => {
    const response = await apiClient.get<ApiResponse<ParcelHistoryItem[]>>(`/parcels/${parcelId}/history`);
    return response.data;
  },
};
