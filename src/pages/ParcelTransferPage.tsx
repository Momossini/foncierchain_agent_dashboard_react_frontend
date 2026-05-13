import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import { useParcel } from '@/hooks/useParcel';
import { TransferOwnershipForm } from '@/components/forms/TransferOwnershipForm';
import { LoadingState } from '@/components/feedback/LoadingState';
import { ErrorState } from '@/components/feedback/ErrorState';

export const ParcelTransferPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: parcel, isLoading, error } = useParcel(id);

  if (isLoading) {
    return <LoadingState message="Chargement des données de la parcelle..." />;
  }

  if (error || !parcel) {
    return (
      <ErrorState
        title="Parcelle introuvable"
        message="Impossible d'initier un transfert pour une parcelle inexistante."
        onRetry={() => navigate('/parcels')}
      />
    );
  }

  // Vérification de sécurité supplémentaire côté UI (le backend validera aussi)
  const isTransferable = parcel.status !== 'TRANSFERRED' && parcel.status !== 'REJECTED_DUPLICATE';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Link
          to={`/parcels/${parcel.id}`}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
          title="Retour à la fiche"
        >
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mutation de propriété</h1>
          <p className="text-gray-600">Transférer la parcelle <span className="font-bold text-blue-600">{parcel.parcelUid}</span> vers un nouveau propriétaire.</p>
        </div>
      </div>

      {!isTransferable && (
        <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-start text-red-800 text-sm">
          <ShieldAlert className="text-red-600 mr-3 mt-0.5 flex-shrink-0" size={20} />
          <div>
            <p className="font-bold mb-1">Action non autorisée</p>
            <p>
              Cette parcelle est actuellement dans un statut (<strong>{parcel.status}</strong>) qui ne permet pas d'initier un nouveau transfert.
            </p>
          </div>
        </div>
      )}

      {isTransferable && (
        <>
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start text-blue-800 text-sm">
            <div className="bg-blue-100 p-1 rounded-full mr-3 mt-0.5">
              <span className="block w-2 h-2 bg-blue-600 rounded-full"></span>
            </div>
            <p>
              Toute mutation de propriété est enregistrée dans l'historique et sécurisée par une preuve numérique blockchain. Assurez-vous de l'exactitude des informations du nouveau propriétaire.
            </p>
          </div>

          <TransferOwnershipForm parcel={parcel} />
        </>
      )}
    </div>
  );
};
