import { LogOut, User, Menu, Search, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useAuth } from '@/hooks/useAuth';
import { Breadcrumbs } from './Breadcrumbs';

interface TopbarProps {
  onMenuClick: () => void;
}

export const Topbar = ({ onMenuClick }: TopbarProps) => {
  const { data: user } = useCurrentUser();
  const { logout } = useAuth();

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 fixed top-0 right-0 left-0 lg:left-(--sidebar-width) z-30 transition-all duration-300">
      <div className="flex items-center space-x-4 flex-1">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg lg:hidden transition-colors"
          aria-label="Ouvrir le menu"
        >
          <Menu size={20} />
        </button>

        <div className="hidden md:flex items-center flex-1 max-w-md relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors" size={16} />
          <input
            type="text"
            placeholder="Rechercher un titre, un propriétaire..."
            className="w-full bg-slate-100/50 border-transparent focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 rounded-xl py-2 pl-10 pr-4 text-sm transition-all outline-none placeholder:text-slate-400"
          />
        </div>

        <div className="hidden lg:block h-6 w-px bg-slate-200 mx-2" />

        <div className="hidden sm:block">
            <Breadcrumbs />
        </div>
      </div>

      <div className="flex items-center space-x-1 sm:space-x-3">
        {/* Notifications Mock */}
        <button className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        <div className="h-8 w-px bg-slate-200 mx-1 sm:mx-2" />

        {user && (
          <Link
            to="/profile"
            className="flex items-center space-x-3 pl-1 sm:pl-2 group"
          >
            <div className="hidden sm:block text-right">
              <p className="text-xs font-bold text-slate-900 leading-tight group-hover:text-brand-600 transition-colors">
                {user.firstname} {user.lastname}
              </p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                {user.role}
              </p>
            </div>
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
              <User size={18} />
            </div>
          </Link>
        )}

        <button
          onClick={logout}
          className="p-2 ml-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
          title="Déconnexion"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};
