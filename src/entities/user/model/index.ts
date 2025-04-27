import './auth';
import { $actualUserParameters, getUserParametersByDateFx } from './user-parameters';
import { $user, getMeFx } from './user';
import { $activityDay, activityDayChanged, $targetNutritionInActivityDay } from './daily-nutrition';
import { $mealsInActivityDay, $nutritionInActivityDay, getMealsByActivityDayFx } from './meals';

export const userModel = {
  stores: {
    $user,
    $actualUserParameters,
    $activityDay,
    $targetNutritionInActivityDay,
    $mealsInActivityDay,
    $nutritionInActivityDay,
  },
  effects: {
    getMeFx,
    getUserParametersByDateFx,
    getMealsByActivityDayFx,
  },
  events: {
    activityDayChanged,
  },
};
