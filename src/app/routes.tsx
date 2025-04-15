import type { ComponentType } from 'react';

import { DashboardPage } from '@/pages/dashboard/';
import { ProfilePage } from '@/pages/profile/ui';

interface Route {
  path: string;
  Component: ComponentType;
}

export const routes: Route[] = [
  { path: '/', Component: DashboardPage },
  { path: '/profile', Component: ProfilePage },
];
