import { LogOut, User, Menu } from 'lucide-react';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useAuth } from '@/hooks/useAuth';

interface TopbarProps {
  onMenuClick: () => void;
}

export const Topbar = ({ onMenuClick }: TopbarProps) => {
  const { data: user } = useCurrentUser();
  const { logout } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 fixed top-0 right-0 left-0 lg:left-64 z-30">
      <div className="flex items-center lg:hidden">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 mr-2 text-gray-600 hover:bg-gray-100 rounded-md"
          aria-label="Ouvrir le menu"
        >
          <Menu size={24} />
        </button>
        <span className="text-xl font-bold text-blue-600">FoncierChain</span>
      </div>

      <div className="flex-1"></div>

      <div className="flex items-center space-x-4">
        {user && (
          <div className="flex items-center space-x-3 border-r pr-4 border-gray-200">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">{user.firstname} {user.lastname}</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider">{user.role}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <User size={20} />
            </div>
          </div>
        )}

        <button
          onClick={logout}
          className="p-2 text-gray-500 hover:text-red-600 transition-colors"
          title="Déconnexion"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};
