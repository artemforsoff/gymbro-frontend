import { sample } from 'effector';
import { createGate } from 'effector-react';
import { recipeModel } from '@/entities/recipe/model';
import { productModel } from '@/entities/product';

export const RecipesPageGate = createGate();

sample({
  clock: RecipesPageGate.open,
  target: [recipeModel.effects.getRecipesFx, productModel.effects.getProductsFx],
});
