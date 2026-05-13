import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Database, PlusCircle, Shield, type LucideIcon } from 'lucide-react';
import { HasRole } from './HasRole';
import type { UserRole } from '@/types';

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
];

export const Sidebar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-slate-900 text-white z-40 hidden lg:flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <Shield className="text-blue-400 mr-3" size={24} />
        <span className="text-xl font-bold tracking-tight">FoncierChain</span>
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
  );
};
