import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const routeMap: Record<string, string> = {
    dashboard: 'Tableau de bord',
    parcels: 'Registre des parcelles',
    new: 'Nouvel enregistrement',
    transfer: 'Transfert de propriété',
    history: 'Historique',
    profile: 'Profil Agent',
    blockchain: 'Registre Blockchain',
  };

  return (
    <nav className="flex items-center space-x-2 text-[13px] font-medium text-slate-500 overflow-hidden">
      <Link
        to="/dashboard"
        className="flex items-center hover:text-brand-600 transition-colors shrink-0"
      >
        <Home size={14} className="mr-1.5" />
        <span className="hidden sm:inline">Accueil</span>
      </Link>

      {pathnames.length > 0 && pathnames[0] !== 'dashboard' && (
        <>
          <ChevronRight size={14} className="text-slate-300 shrink-0" />
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const label = routeMap[value] || value;

            return last ? (
              <span key={to} className="text-slate-900 truncate font-semibold">
                {label}
              </span>
            ) : (
              <div key={to} className="flex items-center shrink-0">
                <Link
                  to={to}
                  className="hover:text-brand-600 transition-colors"
                >
                  {label}
                </Link>
                <ChevronRight size={14} className="mx-2 text-slate-300" />
              </div>
            );
          })}
        </>
      )}
    </nav>
  );
};
