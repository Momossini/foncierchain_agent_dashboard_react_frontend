import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTransferParcel } from '@/hooks/useTransferParcel';
import type { Parcel } from '@/types';
import { Loader2, AlertCircle, UserMinus, UserPlus, Info } from 'lucide-react';

const transferSchema = z.object({
  newOwnerName: z.string().min(3, 'Nom du nouveau propriétaire requis'),
  newOwnerIdentifier: z.string().min(3, 'Identifiant requis'),
  transferType: z.string().min(2, 'Motif de mutation requis'),
  additionalDetails: z.string().optional(),
});

type TransferFormValues = z.infer<typeof transferSchema>;

interface TransferOwnershipFormProps {
  parcel: Parcel;
}

export const TransferOwnershipForm = ({ parcel }: TransferOwnershipFormProps) => {
  const { mutate: transferParcel, isPending, error } = useTransferParcel(parcel.id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransferFormValues>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      transferType: 'VENTE',
    },
  });

  const onSubmit = (data: TransferFormValues) => {
    transferParcel(data);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

        {/* Section: Acteurs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ancien Propriétaire (Lecture seule) */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center">
              <UserMinus className="mr-2" size={16} />
              Propriétaire Actuel
            </h3>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 space-y-2">
              <p className="font-bold text-gray-900">{parcel.currentOwnerName}</p>
              <p className="text-xs text-gray-500 font-mono">ID: {parcel.currentOwnerIdentifier || 'N/A'}</p>
            </div>
          </div>

          {/* Nouveau Propriétaire */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider flex items-center">
              <UserPlus className="mr-2" size={16} />
              Nouveau Propriétaire
            </h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-700">Nom complet *</label>
                <input
                  {...register('newOwnerName')}
                  className={`w-full px-4 py-2 border rounded-lg outline-none transition-all focus:ring-2 ${
                    errors.newOwnerName ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                  }`}
                  placeholder="ex: Marie Traoré"
                />
                {errors.newOwnerName && <p className="text-xs text-red-600">{errors.newOwnerName.message}</p>}
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-700">Identifiant (CNI/Passport) *</label>
                <input
                  {...register('newOwnerIdentifier')}
                  className={`w-full px-4 py-2 border rounded-lg outline-none transition-all focus:ring-2 ${
                    errors.newOwnerIdentifier ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                  }`}
                  placeholder="ex: ML-987654321"
                />
                {errors.newOwnerIdentifier && <p className="text-xs text-red-600">{errors.newOwnerIdentifier.message}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Section: Détails de la mutation */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center">
            <Info className="mr-2" size={16} />
            Détails de la mutation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700">Motif de mutation *</label>
              <select
                {...register('transferType')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-200 bg-white"
              >
                <option value="VENTE">Vente Immobilière</option>
                <option value="SUCCESSION">Succession / Héritage</option>
                <option value="DONATION">Donation</option>
                <option value="PARTAGE">Partage</option>
              </select>
            </div>
            <div className="md:col-span-2 space-y-1">
              <label className="block text-xs font-medium text-gray-700">Notes complémentaires</label>
              <textarea
                {...register('additionalDetails')}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Précisez ici les détails du contrat ou de l'acte notarié..."
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-lg flex items-start text-red-700 text-sm">
            <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
            <p>{(error as any)?.response?.data?.message || 'Une erreur est survenue lors du transfert.'}</p>
          </div>
        )}

        <div className="pt-6 flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md disabled:opacity-70 flex items-center justify-center"
          >
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Transfert en cours...
              </>
            ) : (
              'Confirmer le transfert'
            )}
          </button>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};
