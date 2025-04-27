import { createEvent, sample } from 'effector';
import { createGate } from 'effector-react';
import { productModel } from '@/entities/product';
import { recipeModel } from '@/entities/recipe';
import { userModel } from '@/entities/user/model';

export const NutritionPageGate = createGate();

export const mealDeleted = createEvent();
export const mealCreated = createEvent();

sample({
  clock: [NutritionPageGate.open, userModel.stores.$activityDay, mealDeleted, mealCreated],
  source: userModel.stores.$activityDay,
  fn: (date) => ({ date }),
  target: userModel.effects.getMealsByActivityDayFx,
});

sample({
  clock: NutritionPageGate.open,
  target: [productModel.effects.getProductsFx, recipeModel.effects.getRecipesFx],
});
