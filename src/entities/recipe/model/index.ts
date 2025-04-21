import { createEffect, createStore } from 'effector';
import { type Recipe } from './types';
import { api } from '@/shared/lib';

const $recipes = createStore<Recipe[]>([]);

const getRecipesFx = createEffect(() => {
  return api.get('recipe/user/me').json<Recipe[]>();
});

$recipes.on(getRecipesFx.doneData, (_, recipes) => recipes);

export const recipeModel = { stores: { $recipes }, effects: { getRecipesFx } };
