import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transferApi } from '@/api/transfer';

export const useTransferParcel = (parcelId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => transferApi.transfer(parcelId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['parcel', parcelId] });
      queryClient.invalidateQueries({ queryKey: ['parcel-history', parcelId] });
    },
  });
};
