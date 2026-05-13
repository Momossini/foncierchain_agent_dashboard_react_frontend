import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { parcelsApi } from '@/api/parcels';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useParcels = (params?: any) => {
  return useQuery({
    queryKey: ['parcels', params],
    queryFn: () => parcelsApi.getAll(params),
    select: (response) => response.data,
  });
};

export const useCreateParcel = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: parcelsApi.create,
    onSuccess: (response) => {
      if (response.success && response.data) {
        toast.success('Parcelle créée avec succès');
        queryClient.invalidateQueries({ queryKey: ['parcels'] });
        navigate(`/parcels/${response.data.id}`);
      }
    },
  });
};

export const useValidateParcel = () => {
  return useMutation({
    mutationFn: parcelsApi.validate,
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
