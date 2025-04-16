import { ComponentType } from 'react';

type RouteKey = 'dashboard' | 'profile' | 'workout' | 'nutrition';

export type Route = {
  path: string;
  Component: ComponentType<PageProps>;
  back?: boolean;
  navigation?: boolean;
};

export type Routes = Record<RouteKey, Route>;

export type PageProps = { routes: Routes };
