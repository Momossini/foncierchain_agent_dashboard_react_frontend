import { Database, User, MapPin, CreditCard } from 'lucide-react';
import type { Parcel } from '@/types';
import { ParcelStatusBadge } from './ParcelStatusBadge';
import { parseOwnerId } from '@/lib/parcelUtils';

interface ParcelSummaryCardProps {
  parcel: Parcel;
}

export const ParcelSummaryCard = ({ parcel }: ParcelSummaryCardProps) => {
  const { type, number } = parseOwnerId(parcel.currentOwnerIdentifier || '');
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
              <div className="flex items-center mt-1 text-sm text-gray-500 font-mono">
                <CreditCard size={14} className="mr-2" />
                <span className="font-bold mr-1">{type}:</span> {number || "Non renseigné"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
