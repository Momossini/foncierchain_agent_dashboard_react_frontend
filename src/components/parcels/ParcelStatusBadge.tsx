import type { ParcelStatus } from '@/types';

interface ParcelStatusBadgeProps {
  status: ParcelStatus;
}

const statusConfig: Record<ParcelStatus, { label: string; className: string }> = {
  ACTIVE: { label: 'Active', className: 'bg-green-100 text-green-700 border-green-200' },
  PENDING: { label: 'En attente', className: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  UNDER_REVIEW: { label: 'En révision', className: 'bg-blue-100 text-blue-700 border-blue-200' },
  TRANSFERRED: { label: 'Transférée', className: 'bg-purple-100 text-purple-700 border-purple-200' },
  REJECTED_DUPLICATE: { label: 'Doublon rejeté', className: 'bg-red-100 text-red-700 border-red-200' },
};

export const ParcelStatusBadge = ({ status }: ParcelStatusBadgeProps) => {
  const config = statusConfig[status] || { label: status, className: 'bg-gray-100 text-gray-700 border-gray-200' };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.className}`}>
      {config.label}
    </span>
  );
};
