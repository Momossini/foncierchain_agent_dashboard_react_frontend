import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Database, PlusCircle, Shield, X, type LucideIcon } from 'lucide-react';
import { HasRole } from './HasRole';
import type { UserRole } from '@/types';
import { useEffect } from 'react';

interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
  roles?: UserRole[];
}

const navigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Parcelles', href: '/parcels', icon: Database },
  { name: 'Créer une parcelle', href: '/parcels/new', icon: PlusCircle, roles: ['ADMIN', 'AGENT'] },
  { name: 'Registre Blockchain', href: '/blockchain', icon: Shield },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();

  // Close sidebar on navigation (mobile)
  useEffect(() => {
    if (isOpen && onClose) {
      onClose();
    }
  }, [location.pathname]);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 w-64 bg-slate-900 text-white z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <div className="flex items-center">
            <Shield className="text-blue-400 mr-3" size={24} />
            <span className="text-xl font-bold tracking-tight">FoncierChain</span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-2 -mr-2 text-slate-400 hover:text-white"
              aria-label="Fermer le menu"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <nav className="flex-1 py-6 px-4 space-y-1">
          {navigation.map((item) => {
            const content = (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </NavLink>
            );

            if (item.roles) {
              return (
                <HasRole key={item.name} allowedRoles={item.roles}>
                  {content}
                </HasRole>
              );
            }

            return content;
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800 rounded-lg p-3">
            <p className="text-xs text-slate-400 mb-1">Version</p>
            <p className="text-xs font-mono text-slate-200">v0.1.0-alpha (MVP)</p>
          </div>
        </div>
      </aside>
    </>
  );
};
