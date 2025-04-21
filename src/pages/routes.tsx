import { type Routes } from '@/pages/types';
import * as pages from '@/pages';

export const routes: Routes = {
  dashboard: { path: '/', Component: pages.DashboardPage, navigation: true },
  nutrition: { path: '/nutrition', Component: pages.NutritionPage, navigation: true },
  workout: { path: '/workout', Component: pages.WorkoutPage, navigation: true },

  profile: { path: '/profile', Component: pages.ProfilePage, back: true },
  products: { path: '/products', Component: pages.ProductsPage, back: true },
  recipes: { path: '/recipes', Component: pages.RecipesPage, back: true },
};
