import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, History, ArrowRightLeft, FileText, CheckCircle } from 'lucide-react';
import { useParcel } from '@/hooks/useParcel';
import { ParcelSummaryCard } from '@/components/parcels/ParcelSummaryCard';
import { ParcelDetailCard } from '@/components/parcels/ParcelDetailCard';
import { BlockchainProofCard } from '@/components/blockchain/BlockchainProofCard';
import { LoadingState } from '@/components/feedback/LoadingState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { HasRole } from '@/components/layout/HasRole';

export const ParcelDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data: parcel, isLoading, error } = useParcel(id);

  const transferSuccess = searchParams.get('transferSuccess') === 'true';

  if (isLoading) {
    return <LoadingState message="Chargement de la fiche parcelle..." />;
  }

  if (error || !parcel) {
    return (
      <ErrorState
        title="Parcelle introuvable"
        message="Désolé, nous ne parvenons pas à trouver la parcelle demandée."
        onRetry={() => navigate('/parcels')}
      />
    );
  }

  return (
    <div className="space-y-6">
      {transferSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl flex items-center shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="bg-green-100 p-2 rounded-full mr-4 text-green-600">
            <CheckCircle size={20} />
          </div>
          <div>
            <p className="font-bold">Transfert réussi !</p>
            <p className="text-sm opacity-90">La mutation de propriété a été enregistrée sur la blockchain.</p>
          </div>
        </div>
      )}

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/parcels')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Fiche Parcelle</h1>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to={`/parcels/${parcel.id}/history`}
            className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            <History className="mr-2" size={18} />
            Historique
          </Link>

          <HasRole allowedRoles={['ADMIN', 'AGENT']}>
            <Link
              to={`/parcels/${parcel.id}/transfer`}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md text-sm"
            >
              <ArrowRightLeft className="mr-2" size={18} />
              Transférer
            </Link>
          </HasRole>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <ParcelSummaryCard parcel={parcel} />
          <ParcelDetailCard parcel={parcel} />
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <BlockchainProofCard txHash={parcel.txHash} />

          <HasRole allowedRoles={['ADMIN', 'AGENT']}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 text-sm uppercase tracking-widest mb-4 flex items-center">
                <FileText className="mr-2 text-gray-400" size={18} />
                Actions rapides
              </h3>
              <div className="space-y-2 text-sm">
                <button className="w-full text-left px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                  Générer un certificat
                </button>
                <button className="w-full text-left px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                  Exporter en PDF
                </button>
                <button className="w-full text-left px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                  Signaler une anomalie
                </button>
              </div>
            </div>
          </HasRole>
        </div>
      </div>
    </div>
  );
};
