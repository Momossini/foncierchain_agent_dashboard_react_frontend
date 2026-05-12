import { AlertCircle, RefreshCcw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState = ({
  title = 'Une erreur est survenue',
  message = 'Impossible de charger les données pour le moment.',
  onRetry,
}: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[200px] bg-red-50 border border-red-100 rounded-lg">
      <AlertCircle className="w-8 h-8 text-red-600 mb-4" />
      <h3 className="text-lg font-semibold text-red-900 mb-1">{title}</h3>
      <p className="text-red-700 mb-4 text-center">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          <RefreshCcw className="w-4 h-4 mr-2" />
          Réessayer
        </button>
      )}
    </div>
  );
};
