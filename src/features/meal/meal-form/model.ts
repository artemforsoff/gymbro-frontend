import { api } from '@/shared/lib';
import { createEffect } from 'effector';
import { MealSchema } from './lib/validation-schema';

export const createMealFx = createEffect(
  (payload: Omit<MealSchema, 'datetime'> & { datetime: string }) => {
    return api
      .post('meal', {
        json: payload,
      })
      .json();
  },
);
