import { createEffect, createStore, sample } from 'effector';
import { api } from '@/shared/lib';
import { type Nullable } from '@/shared/types/utility-types';
import { type Recipe } from '@/shared/types/entities';

const $recipes = createStore<Nullable<Recipe[]>>(null);

const getRecipesFx = createEffect(() => {
  return api.get('recipe/user/me').json<Recipe[]>();
});

$recipes.on(getRecipesFx.doneData, (_, recipes) => recipes);

const deleteRecipeFx = createEffect((id: Recipe['id']) => {
  return api.delete(`recipe/${id}`).json();
});

sample({
  clock: deleteRecipeFx.done,
  target: getRecipesFx,
});

export const recipeModel = { stores: { $recipes }, effects: { getRecipesFx, deleteRecipeFx } };
