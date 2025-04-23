import { createEffect, sample } from 'effector';
import { api } from '@/shared/lib';
import { recipeModel } from '@/entities/recipe/model';
import { type Product, type Recipe } from '@/shared/types/entities';

type CreateRecipePayload = Pick<Recipe, 'name' | 'description' | 'isPublic'> & {
  productList: Array<{ productId: Product['id']; amount: number }>;
};

export const createRecipeFx = createEffect((recipe: CreateRecipePayload) => {
  return api
    .post('recipe', {
      json: recipe,
    })
    .json<Product>();
});

sample({
  clock: createRecipeFx.doneData,
  target: recipeModel.effects.getRecipesFx,
});
