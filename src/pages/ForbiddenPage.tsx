import { ShieldAlert, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ForbiddenPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
      <ShieldAlert className="w-20 h-20 text-red-500 mb-6" />
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Accès Interdit</h1>
      <p className="text-xl text-gray-600 mb-8 max-w-md">
        Désolé, vous n'avez pas les autorisations nécessaires pour accéder à cette ressource.
      </p>
      <Link
        to="/dashboard"
        className="flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
      >
        <Home className="mr-2" size={20} />
        Retour au Dashboard
      </Link>
    </div>
  );
};
