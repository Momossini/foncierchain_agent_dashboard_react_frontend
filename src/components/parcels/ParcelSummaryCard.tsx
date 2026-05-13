import { Database, User, MapPin } from 'lucide-react';
import type { Parcel } from '@/types';
import { ParcelStatusBadge } from './ParcelStatusBadge';

interface ParcelSummaryCardProps {
  parcel: Parcel;
}

export const ParcelSummaryCard = ({ parcel }: ParcelSummaryCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-blue-600 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center text-white">
          <Database className="mr-3" size={24} />
          <div>
            <p className="text-xs text-blue-100 uppercase tracking-wider font-semibold">UID Parcelle</p>
            <h2 className="text-xl font-bold">{parcel.parcelUid}</h2>
          </div>
        </div>
        <ParcelStatusBadge status={parcel.status} />
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-start">
          <div className="p-2 bg-gray-50 rounded-lg mr-4 text-gray-500">
            <MapPin size={20} />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-bold mb-1">Localisation</p>
            <p className="text-gray-900 font-medium">{parcel.address}</p>
            <p className="text-sm text-gray-500">{parcel.district}, {parcel.city}</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="p-2 bg-gray-50 rounded-lg mr-4 text-gray-500">
            <User size={20} />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-bold mb-1">Propriétaire actuel</p>
            <p className="text-gray-900 font-bold text-lg">{parcel.currentOwnerName}</p>
            {parcel.currentOwnerIdentifier && (
              <p className="text-sm text-gray-500 font-mono">ID: {parcel.currentOwnerIdentifier}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
