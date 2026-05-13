import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ParcelCreateForm } from '@/components/parcels/ParcelCreateForm';

export const ParcelCreatePage = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Link
          to="/parcels"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
          title="Retour au registre"
        >
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Enregistrer une parcelle</h1>
          <p className="text-gray-600">Ajoutez un nouveau titre foncier au registre FoncierChain.</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start text-blue-800 text-sm">
        <div className="bg-blue-100 p-1 rounded-full mr-3 mt-0.5">
          <span className="block w-2 h-2 bg-blue-600 rounded-full"></span>
        </div>
        <p>
          L'identifiant (UID) doit être unique. Vous pouvez utiliser le bouton <strong>"Vérifier"</strong> dans le formulaire pour vous assurer que l'UID n'est pas déjà utilisé.
        </p>
      </div>

      <ParcelCreateForm />
    </div>
  );
};
