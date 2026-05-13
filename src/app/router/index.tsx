import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { RoleGuard } from '@/components/layout/RoleGuard';
import { AgentAppShell } from '@/components/layout/AgentAppShell';
import { LoginPage } from '@/pages/LoginPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { ParcelsListPage } from '@/pages/ParcelsListPage';
import { ParcelCreatePage } from '@/pages/ParcelCreatePage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

// Pages placeholders (seront créées en phase 3/4)
const Placeholder = ({ name }: { name: string }) => (
  <div className="p-8">
    <h1 className="text-2xl font-bold">{name}</h1>
    <p>Cette page est en cours de développement.</p>
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AgentAppShell />,
        children: [
          {
            path: '/',
            element: <Navigate to="/dashboard" replace />,
          },
          {
            path: '/dashboard',
            element: <DashboardPage />,
          },
          {
            path: '/parcels',
            element: <ParcelsListPage />,
          },
          {
            path: '/parcels/new',
            element: (
              <RoleGuard allowedRoles={['ADMIN', 'AGENT']}>
                <ParcelCreatePage />
              </RoleGuard>
            ),
          },
          {
            path: '/parcels/:id',
            element: <Placeholder name="Parcel Detail" />,
          },
          {
            path: '/parcels/:id/transfer',
            element: (
              <RoleGuard allowedRoles={['ADMIN', 'AGENT']}>
                <Placeholder name="Transfer Parcel" />
              </RoleGuard>
            ),
          },
          {
            path: '/parcels/:id/history',
            element: <Placeholder name="Parcel History" />,
          },
        ],
      },
    ],
  },
  {
    path: '/403',
    element: <ForbiddenPage />,
  },
  {
    path: '/404',
    element: <NotFoundPage />,
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />,
  },
]);
