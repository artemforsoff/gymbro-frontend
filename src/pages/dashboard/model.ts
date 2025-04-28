import { userModel } from '@/entities/user/model';
import { sample } from 'effector';
import { createGate } from 'effector-react';

export const DashboardPageGate = createGate();

sample({
  clock: DashboardPageGate.open,
  source: userModel.stores.$activityDay,
  fn: (date) => ({ date }),
  target: userModel.effects.getMealsByActivityDayFx,
});
