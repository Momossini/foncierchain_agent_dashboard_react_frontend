import { CheckCircle, ArrowRightLeft, AlertTriangle, PlusCircle, User, Calendar, Link as LinkIcon } from 'lucide-react';
import type { ParcelHistoryItem } from '@/types';

interface HistoryTimelineItemProps {
  item: ParcelHistoryItem;
  isLast: boolean;
}

const actionConfig: Record<string, { icon: any; color: string; label: string }> = {
  CREATED: { icon: PlusCircle, color: 'bg-green-500', label: 'Création' },
  TRANSFERRED: { icon: ArrowRightLeft, color: 'bg-blue-500', label: 'Transfert' },
  REJECTED_DUPLICATE: { icon: AlertTriangle, color: 'bg-red-500', label: 'Doublon Rejeté' },
  UPDATED: { icon: CheckCircle, color: 'bg-gray-500', label: 'Mise à jour' },
};

export const HistoryTimelineItem = ({ item, isLast }: HistoryTimelineItemProps) => {
  const config = actionConfig[item.actionType] || { icon: CheckCircle, color: 'bg-gray-400', label: item.actionType };

  return (
    <div className="relative pb-8">
      {!isLast && (
        <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
      )}
      <div className="relative flex items-start space-x-4">
        <div>
          <div className={`relative px-1`}>
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ring-8 ring-white ${config.color} text-white shadow-sm`}>
              <config.icon size={20} />
            </div>
          </div>
        </div>
        <div className="min-w-0 flex-1 py-1.5">
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-blue-100 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <div className="flex items-center">
                <span className="font-bold text-gray-900 mr-2">{config.label}</span>
                <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded uppercase tracking-tighter">
                  Status: OK
                </span>
              </div>
              <div className="flex items-center text-xs text-gray-400 mt-1 sm:mt-0">
                <Calendar size={14} className="mr-1" />
                {new Date(item.createdAt).toLocaleString()}
              </div>
            </div>

            <div className="text-sm text-gray-600 space-y-2">
              <p>{item.details}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {item.performedBy && (
                  <div className="flex items-center text-xs text-gray-500">
                    <User size={14} className="mr-2 text-gray-400" />
                    Agent: <span className="font-medium text-gray-700 ml-1">{item.performedBy}</span>
                  </div>
                )}
                {item.txHash && (
                  <div className="flex items-center text-xs text-blue-600">
                    <LinkIcon size={14} className="mr-2 text-blue-400" />
                    Hash: <span className="font-mono ml-1 truncate max-w-[150px]">{item.txHash}</span>
                  </div>
                )}
              </div>

              {(item.previousOwner || item.newOwner) && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-100 flex flex-col sm:flex-row gap-4 sm:items-center text-xs">
                  {item.previousOwner && (
                    <div>
                      <span className="text-gray-400 block mb-1">Précédent</span>
                      <span className="font-bold text-gray-700">{item.previousOwner}</span>
                    </div>
                  )}
                  {item.previousOwner && item.newOwner && (
                    <ArrowRightLeft size={14} className="text-gray-300 hidden sm:block" />
                  )}
                  {item.newOwner && (
                    <div>
                      <span className="text-blue-400 block mb-1">Nouveau</span>
                      <span className="font-bold text-blue-800">{item.newOwner}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
