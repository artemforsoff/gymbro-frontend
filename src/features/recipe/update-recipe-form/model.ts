import { createEffect, sample } from 'effector';
import { Product } from '@/entities/product/model/types';
import { api } from '@/shared/lib';
import { recipeModel } from '@/entities/recipe/model';
import { type Recipe } from '@/entities/recipe/model/types';

type UpdateRecipePayload = Omit<Recipe, 'createdAt' | 'createdById' | 'products'> & {
  productList: Array<{ productId: Product['id']; amount: number }>;
};

export const updateRecipeFx = createEffect((recipe: UpdateRecipePayload) => {
  return api
    .put(`recipe/${recipe.id}`, {
      json: recipe,
    })
    .json<Product>();
});

sample({
  clock: updateRecipeFx.doneData,
  target: recipeModel.effects.getRecipesFx,
});
