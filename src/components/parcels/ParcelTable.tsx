import { Link } from 'react-router-dom';
import { Eye, ArrowRightLeft, FileText } from 'lucide-react';
import type { Parcel } from '@/types';
import { ParcelStatusBadge } from './ParcelStatusBadge';

interface ParcelTableProps {
  parcels: Parcel[];
}

export const ParcelTable = ({ parcels }: ParcelTableProps) => {
  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                UID Parcelle
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Adresse / Ville
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Propriétaire
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mise à jour
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {parcels.map((parcel) => (
              <tr key={parcel.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600">
                  {parcel.parcelUid}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{parcel.address}</div>
                  <div className="text-xs text-gray-500">{parcel.district}, {parcel.city}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {parcel.currentOwnerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ParcelStatusBadge status={parcel.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {new Date(parcel.updatedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-3">
                    <Link to={`/parcels/${parcel.id}`} className="text-blue-600 hover:text-blue-900" title="Détails">
                      <Eye size={18} />
                    </Link>
                    <Link to={`/parcels/${parcel.id}/transfer`} className="text-green-600 hover:text-green-900" title="Transférer">
                      <ArrowRightLeft size={18} />
                    </Link>
                    <Link to={`/parcels/${parcel.id}/history`} className="text-gray-600 hover:text-gray-900" title="Historique">
                      <FileText size={18} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
