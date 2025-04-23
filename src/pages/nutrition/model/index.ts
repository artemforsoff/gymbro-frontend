import { createEffect, createStore, sample } from 'effector';
import { api } from '@/shared/lib';
import { type Meal } from '@/shared/types/entities';
import { type Nullable } from '@/shared/types/utility-types';
import { createGate } from 'effector-react';
import { productModel } from '@/entities/product';
import { recipeModel } from '@/entities/recipe';
import { DateTime } from 'luxon';

export const NutritionPageGate = createGate();

export const $meals = createStore<Nullable<Meal[]>>(null);

export const getMealsFx = createEffect(({ date }: { date: string }) => {
  return api.get('meal/user/me', { searchParams: { date } }).json<Meal[]>();
});

$meals.on(getMealsFx.doneData, (_, meals) => meals);

sample({
  clock: NutritionPageGate.open,
  target: [productModel.effects.getProductsFx, recipeModel.effects.getRecipesFx],
});

sample({
  clock: NutritionPageGate.open,
  fn: () => ({ date: DateTime.now().toFormat('yyyy-MM-dd') }),
  target: getMealsFx,
});
