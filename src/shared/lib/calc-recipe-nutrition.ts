import { type Recipe } from '@/shared/types/entities';

export const calcRecipeNutrition = (recipe: Recipe) => {
  return recipe.products.reduce(
    (acc, { amount, product }) => {
      const grams = Number(amount);
      if (isNaN(grams)) return acc;

      const factor = grams / 100;

      acc.kcal += Math.round(Number(product.kcal) * factor);
      acc.protein += Math.round(Number(product.protein) * factor);
      acc.fat += Math.round(Number(product.fat) * factor);
      acc.carbs += Math.round(Number(product.carbs) * factor);
      acc.fiber += Math.round(Number(product.fiber) * factor);

      return acc;
    },
    {
      kcal: 0,
      protein: 0,
      fat: 0,
      carbs: 0,
      fiber: 0,
    },
  );
};
