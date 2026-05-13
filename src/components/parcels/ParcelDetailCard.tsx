import type { Parcel } from '@/types';
import { Calendar, Tag, Info } from 'lucide-react';

interface ParcelDetailCardProps {
  parcel: Parcel;
}

export const ParcelDetailCard = ({ parcel }: ParcelDetailCardProps) => {
  const details = [
    { label: 'Identifiant interne', value: parcel.id, icon: Tag },
    { label: 'District', value: parcel.district, icon: Info },
    { label: 'Ville', value: parcel.city, icon: Info },
    { label: 'Date d\'enregistrement', value: new Date(parcel.createdAt).toLocaleString(), icon: Calendar },
    { label: 'Dernière mise à jour', value: new Date(parcel.updatedAt).toLocaleString(), icon: Calendar },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <h3 className="font-bold text-gray-900 uppercase text-xs tracking-widest">Informations détaillées</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 text-sm">
          {details.map((item) => (
            <div key={item.label} className="flex flex-col space-y-1">
              <span className="text-gray-400 flex items-center">
                <item.icon size={14} className="mr-2" />
                {item.label}
              </span>
              <span className="text-gray-900 font-medium break-all">{item.value}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
          <p className="text-xs text-gray-400 font-bold uppercase mb-2">Géométrie / GeoJSON</p>
          <pre className="text-xs text-gray-600 overflow-auto max-h-32 font-mono">
            {parcel.geometry ? JSON.stringify(parcel.geometry, null, 2) : "Aucune donnée de géométrie disponible."}
          </pre>
        </div>
      </div>
    </div>
  );
};
