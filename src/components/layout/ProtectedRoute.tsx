import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export const ProtectedRoute = () => {
  const { data: user, isLoading } = useCurrentUser();
  const location = useLocation();
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
