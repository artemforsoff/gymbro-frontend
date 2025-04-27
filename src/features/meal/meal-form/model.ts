import { api } from '@/shared/lib';
import { createEffect } from 'effector';
import { MealSchema } from './lib/validation-schema';

export const createMealFx = createEffect((payload: MealSchema) => {
  return api
    .post('meal', {
      json: payload,
    })
    .json();
});
