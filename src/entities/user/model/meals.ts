import { api, calcMealNutrition } from '@/shared/lib';
import { Meal } from '@/shared/types/entities';
import { Nullable } from '@/shared/types/utility-types';
import { createEffect, createStore } from 'effector';

export const $mealsInActivityDay = createStore<Nullable<Meal[]>>(null);

export const getMealsByActivityDayFx = createEffect(({ date }: { date: string }) => {
  return api.get('meal/user/me', { searchParams: { date } }).json<Meal[]>();
});

$mealsInActivityDay.on(getMealsByActivityDayFx.doneData, (_, meals) => meals);

export const $nutritionInActivityDay = $mealsInActivityDay.map((meals) => {
  return (meals || []).reduce(
    (total, meal) => {
      const { kcal, protein, fat, carbs } = calcMealNutrition(meal);

      return {
        kcal: total.kcal + kcal,
        protein: total.protein + protein,
        fat: total.fat + fat,
        carbs: total.carbs + carbs,
      };
    },
    {
      kcal: 0,
      protein: 0,
      fat: 0,
      carbs: 0,
    },
  );
});
