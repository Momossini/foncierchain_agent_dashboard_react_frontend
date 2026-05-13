import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCreateParcel, useValidateParcel } from '@/hooks/useParcels';
import { Loader2, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { useState } from 'react';
import { getErrorMessage } from '@/lib/errors';

const parcelSchema = z.object({
  parcelUid: z.string().min(3, 'UID requis (min 3 caractères)'),
  address: z.string().min(5, 'Adresse requise'),
  district: z.string().min(2, 'District requis'),
  city: z.string().min(2, 'Ville requise'),
  currentOwnerName: z.string().min(3, 'Nom du propriétaire requis'),
  currentOwnerIdentifier: z.string().min(0),
  status: z.enum(['ACTIVE', 'PENDING', 'UNDER_REVIEW']),
});

type ParcelFormValues = z.infer<typeof parcelSchema>;

export const ParcelCreateForm = () => {
  const { mutate: createParcel, isPending: isCreating, error: createError } = useCreateParcel();
  const { mutateAsync: validateParcel, isPending: isValidating } = useValidateParcel();
  const [validationResult, setValidationResult] = useState<{ valid: boolean; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ParcelFormValues>({
    resolver: zodResolver(parcelSchema),
    defaultValues: {
      parcelUid: '',
      address: '',
      district: '',
      city: '',
      currentOwnerName: '',
      currentOwnerIdentifier: '',
      status: 'ACTIVE',
    },
  });

  const parcelUid = watch('parcelUid');

  const handlePreValidate = async () => {
    if (!parcelUid || parcelUid.length < 3) return;

    try {
      const response = await validateParcel({ parcelUid });
      if (response.success) {
        setValidationResult({ valid: true, message: 'Cet UID est disponible.' });
      } else {
        setValidationResult({
          valid: false,
          message: response.error?.message || 'Cet UID est déjà enregistré ou invalide.'
        });
      }
    } catch (err) {
      setValidationResult({ valid: false, message: 'Erreur lors de la validation.' });
    }
  };

  const onSubmit = (data: ParcelFormValues) => {
    createParcel(data);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Section: Identification */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 flex items-center">
            <Info className="mr-2 text-blue-600" size={20} />
            Identification de la parcelle
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">UID Parcelle *</label>
              <div className="flex gap-2">
                <input
                  {...register('parcelUid')}
                  className={`flex-1 px-4 py-2 border rounded-lg outline-none transition-all focus:ring-2 ${
                    errors.parcelUid ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                  }`}
                  placeholder="ex: PAR-2024-001"
                />
                <button
                  type="button"
                  onClick={handlePreValidate}
                  disabled={isValidating || !parcelUid || parcelUid.length < 3}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors text-sm font-medium"
                >
                  {isValidating ? <Loader2 size={18} className="animate-spin" /> : 'Vérifier'}
                </button>
              </div>
              {errors.parcelUid && <p className="text-xs text-red-600">{errors.parcelUid.message}</p>}
              {validationResult && (
                <p className={`text-xs mt-1 flex items-center ${validationResult.valid ? 'text-green-600' : 'text-red-600'}`}>
                  {validationResult.valid ? <CheckCircle size={14} className="mr-1" /> : <AlertCircle size={14} className="mr-1" />}
                  {validationResult.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Statut initial</label>
              <select
                {...register('status')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-200 bg-white"
              >
                <option value="ACTIVE">Active</option>
                <option value="PENDING">En attente</option>
                <option value="UNDER_REVIEW">En révision</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section: Localisation */}
        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Localisation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 space-y-1">
              <label className="block text-sm font-medium text-gray-700">Adresse complète *</label>
              <input
                {...register('address')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="ex: 123 Rue de la République"
              />
              {errors.address && <p className="text-xs text-red-600">{errors.address.message}</p>}
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">District / Secteur *</label>
              <input
                {...register('district')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="ex: District Central"
              />
              {errors.district && <p className="text-xs text-red-600">{errors.district.message}</p>}
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Ville *</label>
              <input
                {...register('city')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="ex: Bamako"
              />
              {errors.city && <p className="text-xs text-red-600">{errors.city.message}</p>}
            </div>
          </div>
        </div>

        {/* Section: Propriétaire */}
        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Propriétaire actuel</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Nom complet *</label>
              <input
                {...register('currentOwnerName')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="ex: Jean Dupont"
              />
              {errors.currentOwnerName && <p className="text-xs text-red-600">{errors.currentOwnerName.message}</p>}
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Identifiant (CNI/Passport)</label>
              <input
                {...register('currentOwnerIdentifier')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="ex: 123456789"
              />
            </div>
          </div>
        </div>

        {createError && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-lg flex items-start text-red-700 text-sm">
            <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
            <p>{getErrorMessage((createError as any)?.response?.data?.error?.code)}</p>
          </div>
        )}

        <div className="pt-6 flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={isCreating}
            className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md disabled:opacity-70 flex items-center justify-center"
          >
            {isCreating ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Enregistrement...
              </>
            ) : (
              'Enregistrer la parcelle'
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
