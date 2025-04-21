import { createEffect, sample } from 'effector';
import { Product } from '@/entities/product/model/types';
import { api } from '@/shared/lib';
import { recipeModel } from '@/entities/recipe/model';
import { type Recipe } from '@/entities/recipe/model/types';

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
