import { UserDailyNutrition } from '@/features/user';
import { type PageProps } from '@/pages/types';
import { type FC } from 'react';

export const DashboardPage: FC<PageProps> = () => {
  return <UserDailyNutrition />;
};
