import { User, Mail, Shield, Calendar, MapPin } from 'lucide-react';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { LoadingState } from '@/components/feedback/LoadingState';

export const ProfilePage = () => {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) return <LoadingState />;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Mon Profil Agent</h1>

      <div className="card overflow-hidden">
        <div className="h-32 bg-brand-600 relative">
          <div className="absolute -bottom-12 left-8">
            <div className="h-24 w-24 bg-white rounded-2xl shadow-md border-4 border-white flex items-center justify-center text-brand-600">
              <User size={48} />
            </div>
          </div>
        </div>

        <div className="pt-16 pb-8 px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{user?.firstname} {user?.lastname}</h2>
              <p className="text-gray-500 flex items-center mt-1">
                <Shield size={16} className="mr-2 text-brand-500" />
                Agent de Registre • ID: {user?.id.slice(0, 8).toUpperCase()}
              </p>
            </div>
            <div className="flex gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                user?.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {user?.isActive ? 'Compte Actif' : 'Compte Inactif'}
              </span>
              <span className="px-3 py-1 bg-brand-100 text-brand-700 rounded-full text-xs font-bold uppercase tracking-wider">
                {user?.role}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 border-t border-gray-100 pt-8">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 uppercase text-xs tracking-widest">Informations de contact</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Mail size={18} className="mr-3 text-gray-400" />
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin size={18} className="mr-3 text-gray-400" />
                  <span>Direction Régionale, Paris</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 uppercase text-xs tracking-widest">Historique du compte</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Calendar size={18} className="mr-3 text-gray-400" />
                  <span>Dernière connexion : {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Paramètres de sécurité</h3>
        <p className="text-sm text-gray-500 mb-6">Gérez l'accès à votre compte agent et vos clés de signature.</p>
        <div className="space-y-4">
          <button className="btn-secondary text-sm">Changer le mot de passe</button>
          <button className="btn-secondary text-sm ml-4">Gérer les clés PGP/GPG</button>
        </div>
      </div>
    </div>
  );
};
