import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { useParcelHistory } from '@/hooks/useParcelHistory';
import { useParcel } from '@/hooks/useParcel';
import { HistoryTimeline } from '@/components/history/HistoryTimeline';
import { LoadingState } from '@/components/feedback/LoadingState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { EmptyState } from '@/components/feedback/EmptyState';

export const ParcelHistoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: parcel } = useParcel(id);
  const { data: history, isLoading, error } = useParcelHistory(id);

  if (isLoading) {
    return <LoadingState message="Chargement de l'historique..." />;
  }

  if (error) {
    return (
      <ErrorState
        message="Impossible de récupérer l'historique de cette parcelle."
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          to={parcel ? `/parcels/${parcel.id}` : '/parcels'}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
          title="Retour à la fiche"
        >
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Clock className="mr-3 text-blue-600" size={28} />
            Historique complet
          </h1>
          {parcel && (
            <p className="text-gray-600 italic">
              Traçabilité des opérations pour la parcelle <span className="font-bold text-blue-600">{parcel.parcelUid}</span>
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="bg-gray-50/50 p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-inner">
        {history && history.length > 0 ? (
          <HistoryTimeline history={history} />
        ) : (
          <EmptyState
            title="Aucun historique"
            message="Cette parcelle ne possède pas encore d'événements enregistrés."
          />
        )}
      </div>

      <div className="text-center">
        <p className="text-xs text-gray-400">
          Toutes les opérations listées ci-dessus sont auditées et sécurisées par FoncierChain.
        </p>
      </div>
    </div>
  );
};
