import { api } from '@/shared/lib';
import { Meal } from '@/shared/types/entities';
import { createEffect } from 'effector';

export const deleteMealFx = createEffect((id: Meal['id']) => {
  return api.delete(`meal/${id}`).json();
});
