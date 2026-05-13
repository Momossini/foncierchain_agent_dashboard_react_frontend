import { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useParcels, useSearchParcels } from '@/hooks/useParcels';
import { ParcelSearchBar } from '@/components/parcels/ParcelSearchBar';
import { ParcelTable } from '@/components/parcels/ParcelTable';
import { LoadingState } from '@/components/feedback/LoadingState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { EmptyState } from '@/components/feedback/EmptyState';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export const ParcelsListPage = () => {
  const { data: user } = useCurrentUser();
  const [searchQuery, setSearchQuery] = useState('');

  // Si on a une recherche, on utilise useSearchParcels, sinon useParcels
  const { data: allParcels, isLoading: isLoadingAll, error: errorAll, refetch: refetchAll } = useParcels();
  const { data: searchedParcels, isLoading: isLoadingSearch, error: errorSearch } = useSearchParcels(searchQuery);

  const isLoading = isLoadingAll || (searchQuery.length > 2 && isLoadingSearch);
  const error = errorAll || errorSearch;
  const parcels = searchQuery.length > 2 ? searchedParcels : allParcels;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Registre des Parcelles</h1>
          <p className="text-gray-600">Gérez et consultez l'ensemble des titres fonciers enregistrés.</p>
        </div>

        {(user?.role === 'ADMIN' || user?.role === 'AGENT') && (
          <Link
            to="/parcels/new"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            <Plus className="mr-2" size={20} />
            Nouvelle parcelle
          </Link>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <ParcelSearchBar onSearch={handleSearch} />

        <div className="flex items-center space-x-2 w-full sm:w-auto border-t sm:border-t-0 sm:border-l pt-4 sm:pt-0 sm:pl-4">
          <Filter size={18} className="text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Filtres :</span>
          <select className="text-sm border-none bg-gray-50 rounded-md focus:ring-0 cursor-pointer">
            <option>Tous les statuts</option>
            <option>Active</option>
            <option>En attente</option>
            <option>Transférée</option>
          </select>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <LoadingState message="Chargement des parcelles..." />
      ) : error ? (
        <ErrorState
          message="Impossible de récupérer la liste des parcelles."
          onRetry={() => refetchAll()}
        />
      ) : parcels && parcels.length > 0 ? (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            {parcels.length} parcelle{parcels.length > 1 ? 's' : ''} trouvée{parcels.length > 1 ? 's' : ''}
          </p>
          <ParcelTable parcels={parcels} />
        </div>
      ) : (
        <EmptyState
          title={searchQuery ? "Aucun résultat" : "Registre vide"}
          message={searchQuery
            ? `Aucune parcelle ne correspond à "${searchQuery}".`
            : "Aucune parcelle n'a encore été enregistrée dans le système."
          }
        />
      )}
    </div>
  );
};
