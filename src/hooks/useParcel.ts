import { useQuery } from '@tanstack/react-query';
import { parcelsApi } from '@/api/parcels';

export const useParcel = (id?: string) => {
  return useQuery({
    queryKey: ['parcel', id],
    queryFn: () => parcelsApi.getById(id!),
    enabled: !!id,
    select: (response) => response.data,
  });
};

export const useParcelByUid = (uid?: string) => {
  return useQuery({
    queryKey: ['parcel', 'uid', uid],
    queryFn: () => parcelsApi.getByUid(uid!),
    enabled: !!uid,
    select: (response) => response.data,
  });
};
