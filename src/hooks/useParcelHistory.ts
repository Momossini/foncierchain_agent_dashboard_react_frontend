import { useQuery } from '@tanstack/react-query';
import { historyApi } from '@/api/history';

export const useParcelHistory = (parcelId?: string) => {
  return useQuery({
    queryKey: ['parcel-history', parcelId],
    queryFn: () => historyApi.getHistory(parcelId!),
    enabled: !!parcelId,
    select: (response) => response.data,
  });
};
