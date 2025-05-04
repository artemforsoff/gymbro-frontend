import { api, calcMealNutrition } from '@/shared/lib';
import { Meal, Nutrients } from '@/shared/types/entities';
import { Nullable } from '@/shared/types/utility-types';
import { createEffect, createStore } from 'effector';

export const $mealsInActivityDay = createStore<Nullable<Meal[]>>(null);

export const getMealsByActivityDayFx = createEffect(({ date }: { date: string }) => {
  return api.get('meal/user/me', { searchParams: { date } }).json<Meal[]>();
});

$mealsInActivityDay.on(getMealsByActivityDayFx.doneData, (_, meals) => meals);

export const $nutritionInActivityDay = $mealsInActivityDay.map((meals) => {
  return (meals || []).reduce<Nutrients>(
    (total, meal) => {
      const {
        kcal,
        protein,
        fat,
        carbs,
        fiber = 0,
        animalProtein,
        plantProtein,
        otherProtein,
      } = calcMealNutrition(meal);

      total.kcal += kcal;
      total.protein += protein;
      total.fat += fat;
      total.carbs += carbs;
      total.fiber = (total.fiber ?? 0) + fiber;
      total.animalProtein += animalProtein;
      total.plantProtein += plantProtein;
      total.otherProtein += otherProtein;

      return total;
    },
    {
      kcal: 0,
      protein: 0,
      fat: 0,
      carbs: 0,
      fiber: 0,
      animalProtein: 0,
      plantProtein: 0,
      otherProtein: 0,
    },
  );
});
