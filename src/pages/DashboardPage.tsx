import { Link } from 'react-router-dom';
import {
  PlusCircle,
  Search,
  ArrowRightLeft,
  Database,
  Clock,
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  type LucideIcon
} from 'lucide-react';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useParcels } from '@/hooks/useParcels';
import { HasRole } from '@/components/layout/HasRole';
import type { UserRole } from '@/types';

interface Shortcut {
  name: string;
  href: string;
  icon: LucideIcon;
  description: string;
  roles?: UserRole[];
}

export const DashboardPage = () => {
  const { data: user } = useCurrentUser();
  const { data: parcels, isLoading } = useParcels();

  const stats = [
    { label: 'Total Parcelles', value: parcels?.length || 0, icon: Database, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Transferts Récents', value: 12, icon: ArrowRightLeft, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Alertes / Doublons', value: 2, icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  const shortcuts: Shortcut[] = [
    { name: 'Créer une parcelle', href: '/parcels/new', icon: PlusCircle, description: 'Enregistrer un nouveau titre foncier', roles: ['ADMIN', 'AGENT'] },
    { name: 'Rechercher', href: '/parcels', icon: Search, description: 'Consulter le registre des parcelles' },
    { name: 'Transférer', href: '/parcels', icon: ArrowRightLeft, description: 'Initier une mutation de propriété', roles: ['ADMIN', 'AGENT'] },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-600">Bienvenue, {user?.firstname}. Voici un aperçu de l'activité du registre.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
            <div key={stat.label} className="card p-6 flex items-center">
            <div className={`p-3 rounded-lg ${stat.bg} ${stat.color} mr-4`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{isLoading ? '...' : stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Shortcuts */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <TrendingUp className="mr-2 text-blue-600" size={20} />
          Actions rapides
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {shortcuts.map((shortcut) => {
            const content = (
              <Link
                key={shortcut.name}
                to={shortcut.href}
                className="group card p-6 hover:border-brand-300 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <shortcut.icon size={24} />
                  </div>
                  <ChevronRight size={20} className="text-gray-300 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{shortcut.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{shortcut.description}</p>
              </Link>
            );

            if (shortcut.roles) {
              return (
                <HasRole key={shortcut.name} allowedRoles={shortcut.roles}>
                  {content}
                </HasRole>
              );
            }

            return content;
          })}
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <Clock className="mr-2 text-blue-600" size={20} />
            Activités récentes
          </h2>
          <button className="text-sm text-blue-600 font-medium hover:underline">Voir tout</button>
        </div>
        <div className="p-6">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-gray-50 animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : parcels && parcels.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {parcels.slice(0, 5).map((parcel) => (
                <div key={parcel.id} className="py-4 flex items-center justify-between first:pt-0 last:pb-0">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mr-4">
                      <Database size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Nouvelle parcelle : {parcel.parcelUid}</p>
                      <p className="text-xs text-gray-500">{parcel.address}, {parcel.city}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">
                    {parcel.createdAt ? new Date(parcel.createdAt).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Aucune activité récente enregistrée.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
