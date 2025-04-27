import { Meal, Nutrients } from '../types/entities';
import { calcProductsNutrition } from './calc-products-nutrition';

export const calcMealNutrition = ({
  products,
  recipes,
}: Pick<Meal, 'products' | 'recipes'>): Nutrients => {
  const productsNutrition = calcProductsNutrition(products);

  const recipesNutrition = recipes.reduce(
    (acc, { products }) => {
      const productsNutrition = calcProductsNutrition(products);

      acc.kcal += productsNutrition.kcal;
      acc.protein += productsNutrition.protein;
      acc.fat += productsNutrition.fat;
      acc.carbs += productsNutrition.carbs;
      acc.fiber += productsNutrition.fiber ?? 0;

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

  return {
    kcal: productsNutrition.kcal + recipesNutrition.kcal,
    protein: productsNutrition.protein + recipesNutrition.protein,
    fat: productsNutrition.fat + recipesNutrition.fat,
    carbs: productsNutrition.carbs + recipesNutrition.carbs,
    fiber: (productsNutrition.fiber ?? 0) + recipesNutrition.fiber,
  };
};
