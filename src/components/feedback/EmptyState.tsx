import { FileQuestion } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
}

export const EmptyState = ({
  title = 'Aucune donnée trouvée',
  message = 'Il n\'y a aucun élément à afficher pour le moment.',
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[200px] border-2 border-dashed border-gray-200 rounded-lg">
      <FileQuestion className="w-8 h-8 text-gray-400 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-500 text-center">{message}</p>
    </div>
  );
};
