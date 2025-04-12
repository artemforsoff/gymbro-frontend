import type { ComponentType, JSX } from 'react';

import { DashboardPage } from '@/pages/dashboard/';

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [{ path: '/', Component: DashboardPage, title: 'Dashboard' }];
