import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { RoleGuard } from '@/components/layout/RoleGuard';
import { AgentAppShell } from '@/components/layout/AgentAppShell';
import { LoginPage } from '@/pages/LoginPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { ParcelsListPage } from '@/pages/ParcelsListPage';
import { ParcelCreatePage } from '@/pages/ParcelCreatePage';
import { ParcelDetailPage } from '@/pages/ParcelDetailPage';
import { ParcelTransferPage } from '@/pages/ParcelTransferPage';
import { ParcelHistoryPage } from '@/pages/ParcelHistoryPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { BlockchainRegistryPage } from '@/pages/BlockchainRegistryPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

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
            element: <ParcelDetailPage />,
          },
          {
            path: '/parcels/:id/transfer',
            element: (
              <RoleGuard allowedRoles={['ADMIN', 'AGENT']}>
                <ParcelTransferPage />
              </RoleGuard>
            ),
          },
          {
            path: '/parcels/:id/history',
            element: <ParcelHistoryPage />,
          },
          {
            path: '/profile',
            element: <ProfilePage />,
          },
          {
            path: '/blockchain',
            element: <BlockchainRegistryPage />,
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
