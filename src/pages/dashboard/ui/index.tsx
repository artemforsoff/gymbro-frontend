import { userModel } from '@/entities/user/model';
import { UserDailyNutrition } from '@/features/user';
import { type PageProps } from '@/pages/types';
import { useGate, useUnit } from 'effector-react';
import { type FC } from 'react';
import { DashboardPageGate } from '../model';

export const DashboardPage: FC<PageProps> = () => {
  useGate(DashboardPageGate);

  const currentNutrition = useUnit(userModel.stores.$nutritionInActivityDay);
  const targetNutrition = useUnit(userModel.stores.$targetNutritionInActivityDay);

  return (
    <>
      {currentNutrition && targetNutrition && (
        <UserDailyNutrition currentNutrients={currentNutrition} targetNutrients={targetNutrition} />
      )}
    </>
  );
};
