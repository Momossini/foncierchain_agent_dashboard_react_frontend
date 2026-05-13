import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transferApi } from '@/api/transfer';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useTransferParcel = (parcelId: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: any) => transferApi.transfer(parcelId, data),
    onSuccess: () => {
      toast.success('Mutation de propriété enregistrée avec succès');
      queryClient.invalidateQueries({ queryKey: ['parcel', parcelId] });
      queryClient.invalidateQueries({ queryKey: ['parcel-history', parcelId] });
      navigate(`/parcels/${parcelId}?transferSuccess=true`);
    },
  });
};
