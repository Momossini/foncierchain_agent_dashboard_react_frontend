import { useState, useEffect } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Database,
  PlusCircle,
  Shield,
  X,
  ChevronDown,
  ChevronRight,
  List,
  User,
  Activity,
  type LucideIcon
} from 'lucide-react';
import { HasRole } from './HasRole';
import { cn } from '@/lib/utils';
import type { UserRole } from '@/types';

interface SubNavItem {
  name: string;
  href: string;
  icon?: LucideIcon;
  roles?: UserRole[];
}

interface NavigationGroup {
  name: string;
  label?: string; // Group header (e.g. "GESTION")
  icon: LucideIcon;
  href?: string; // If it's a direct link
  children?: SubNavItem[];
  roles?: UserRole[];
}

const navigation: NavigationGroup[] = [
  {
    name: 'Tableau de bord',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    name: 'Gestion des Titres',
    label: 'OPÉRATIONS',
    icon: Database,
    children: [
      { name: 'Registre complet', href: '/parcels', icon: List },
      { name: 'Nouvel enregistrement', href: '/parcels/new', icon: PlusCircle, roles: ['ADMIN', 'AGENT'] },
    ]
  },
  {
    name: 'Suivi & Audit',
    label: 'CONTRÔLE',
    icon: Activity,
    children: [
      { name: 'Registre Blockchain', href: '/blockchain', icon: Shield },
    ]
  },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  // Auto-expand group if a child is active
  useEffect(() => {
    navigation.forEach(group => {
      if (group.children?.some(child => location.pathname.startsWith(child.href))) {
        if (!expandedGroups.includes(group.name)) {
          setExpandedGroups(prev => [...prev, group.name]);
        }
      }
    });
  }, [location.pathname]);

  const toggleGroup = (name: string) => {
    setExpandedGroups(prev =>
      prev.includes(name) ? prev.filter(g => g !== name) : [...prev, name]
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <aside className={cn(
        "fixed inset-y-0 left-0 w-(--sidebar-width) bg-slate-950 text-slate-300 z-50 flex flex-col transition-all duration-300 ease-in-out border-r border-slate-800 lg:translate-x-0 shadow-2xl lg:shadow-none",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Branding */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-brand-600 rounded-lg flex items-center justify-center shadow-lg shadow-brand-500/20">
              <Shield className="text-white" size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white tracking-tight leading-none">FoncierChain</span>
              <span className="text-[10px] text-slate-500 font-medium tracking-widest uppercase mt-0.5">Portal Agent</span>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-2 -mr-2 text-slate-500 hover:text-white transition-colors"
              aria-label="Fermer le menu"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-8 scrollbar-thin scrollbar-thumb-slate-800">
          {navigation.map((group) => {
            const isExpanded = expandedGroups.includes(group.name);
            const isChildActive = group.children?.some(child => location.pathname === child.href);
            const isDirectActive = group.href && location.pathname === group.href;

            const groupContent = (
              <div key={group.name} className="space-y-1">
                {group.label && (
                  <h3 className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                    {group.label}
                  </h3>
                )}

                {group.href ? (
                  <NavLink
                    to={group.href}
                    className={({ isActive }) => cn(
                      "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group",
                      isActive
                        ? "bg-brand-600/10 text-brand-400"
                        : "text-slate-400 hover:bg-slate-900 hover:text-slate-100"
                    )}
                  >
                    <group.icon className={cn(
                      "mr-3 h-5 w-5 transition-colors",
                      isDirectActive ? "text-brand-500" : "text-slate-500 group-hover:text-slate-300"
                    )} />
                    {group.name}
                    {isDirectActive && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-500 shadow-sm shadow-brand-500/50" />}
                  </NavLink>
                ) : (
                  <>
                    <button
                      onClick={() => toggleGroup(group.name)}
                      className={cn(
                        "w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group",
                        isChildActive
                          ? "text-slate-100"
                          : "text-slate-400 hover:bg-slate-900 hover:text-slate-100"
                      )}
                    >
                      <group.icon className={cn(
                        "mr-3 h-5 w-5 transition-colors",
                        isChildActive ? "text-brand-500" : "text-slate-500 group-hover:text-slate-300"
                      )} />
                      <span className="flex-1 text-left">{group.name}</span>
                      {isExpanded ? (
                        <ChevronDown size={14} className="text-slate-600 group-hover:text-slate-400" />
                      ) : (
                        <ChevronRight size={14} className="text-slate-600 group-hover:text-slate-400" />
                      )}
                    </button>

                    {/* Children */}
                    <div className={cn(
                      "space-y-1 mt-1 ml-4 border-l border-slate-800/50 overflow-hidden transition-all duration-300 ease-in-out",
                      isExpanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    )}>
                      {group.children?.map((child) => {
                        const childItem = (
                          <NavLink
                            key={child.href}
                            to={child.href}
                            className={({ isActive }) => cn(
                              "flex items-center px-4 py-2 text-[13px] font-medium transition-all duration-200 border-l-2 -ml-[1px]",
                              isActive
                                ? "text-brand-400 border-brand-500 bg-brand-500/5"
                                : "text-slate-500 border-transparent hover:text-slate-300 hover:border-slate-700"
                            )}
                          >
                            {child.name}
                          </NavLink>
                        );

                        if (child.roles) {
                          return (
                            <HasRole key={child.href} allowedRoles={child.roles}>
                              {childItem}
                            </HasRole>
                          );
                        }
                        return childItem;
                      })}
                    </div>
                  </>
                )}
              </div>
            );

            if (group.roles) {
              return (
                <HasRole key={group.name} allowedRoles={group.roles}>
                  {groupContent}
                </HasRole>
              );
            }
            return groupContent;
          })}
        </nav>

        {/* User Quick Info */}
        <div className="p-4 border-t border-slate-800/50 bg-slate-950/30">
          <Link
            to="/profile"
            className="flex items-center p-2 rounded-xl hover:bg-slate-900 transition-colors group"
          >
            <div className="h-9 w-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-brand-600/20 group-hover:text-brand-400 transition-colors">
              <User size={18} />
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="text-xs font-bold text-slate-200 truncate">Agent de Registre</p>
              <p className="text-[10px] text-slate-500 truncate">v0.1.0-alpha</p>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
};
