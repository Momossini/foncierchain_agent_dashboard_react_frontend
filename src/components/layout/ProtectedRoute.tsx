import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { LoadingState } from '../feedback/LoadingState';

export const ProtectedRoute = () => {
  const { data: user, isLoading, isError } = useCurrentUser();
  const location = useLocation();
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingState message="Vérification de la session..." />
      </div>
    );
  }

  if (isError) {
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
