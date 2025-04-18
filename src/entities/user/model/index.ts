import { $userParameters, getUserParametersFx } from './user-parameters';
import { $user, getMeFx } from './user';
import { $dailyNutrition } from './daily-nutrition';

export const userModel = {
  stores: {
    $user,
    $userParameters,
    $dailyNutrition,
  },
  effects: {
    getMeFx,
    getUserParametersFx,
  },
};
