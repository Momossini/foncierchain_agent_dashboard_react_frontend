import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState = ({ message = 'Chargement en cours...' }: LoadingStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[200px]">
      <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
      <p className="text-gray-600 font-medium">{message}</p>
    </div>
  );
};
