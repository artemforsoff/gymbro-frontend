import { ComponentType } from 'react';

type RouteKey = 'dashboard' | 'profile' | 'workout' | 'nutrition' | 'products' | 'recipes';

export type Route = {
  path: string;
  Component: ComponentType<PageProps>;
  back?: boolean;
  main?: boolean;
};

export type Routes = Record<RouteKey, Route>;

export type PageProps = { routes: Routes };
