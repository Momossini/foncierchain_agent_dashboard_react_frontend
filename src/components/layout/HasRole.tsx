import type { ReactNode } from 'react';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import type { UserRole } from '@/types';

interface HasRoleProps {
  allowedRoles: UserRole[];
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Composant utilitaire pour l'affichage conditionnel basé sur les rôles.
 */
export const HasRole = ({ allowedRoles, children, fallback = null }: HasRoleProps) => {
  const { data: user } = useCurrentUser();

  if (!user || !allowedRoles.includes(user.role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
