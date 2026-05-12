import { useQuery } from '@tanstack/react-query';
import { parcelsApi } from '@/api/parcels';

export const useParcels = (params?: any) => {
  return useQuery({
    queryKey: ['parcels', params],
    queryFn: () => parcelsApi.getAll(params),
    select: (response) => response.data,
  });
};

export const useSearchParcels = (query: string) => {
  return useQuery({
    queryKey: ['parcels', 'search', query],
    queryFn: () => parcelsApi.search(query),
    enabled: query.length > 2,
    select: (response) => response.data,
  });
};
