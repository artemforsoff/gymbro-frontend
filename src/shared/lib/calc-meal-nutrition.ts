import { Meal, Nutrients } from '../types/entities';
import { calcProductsNutrition } from './calc-products-nutrition';

export const calcMealNutrition = ({
  products,
  recipes,
}: Pick<Meal, 'products' | 'recipes'>): Nutrients => {
  const productsNutrition = calcProductsNutrition(products);

  const recipesNutrition: Nutrients = recipes.reduce(
    (acc, { products }) => {
      const productsNutrition = calcProductsNutrition(products);

      acc.kcal += productsNutrition.kcal;
      acc.protein += productsNutrition.protein;
      acc.fat += productsNutrition.fat;
      acc.carbs += productsNutrition.carbs;
      acc.fiber += productsNutrition.fiber ?? 0;
      acc.animalProtein += productsNutrition.animalProtein;
      acc.plantProtein += productsNutrition.plantProtein;
      acc.otherProtein += productsNutrition.otherProtein;

      return acc;
    },
    {
      kcal: 0,
      protein: 0,
      fat: 0,
      carbs: 0,
      fiber: 0,
      animalProtein: 0,
      plantProtein: 0,
      otherProtein: 0,
    },
  );

  return {
    kcal: productsNutrition.kcal + recipesNutrition.kcal,
    protein: productsNutrition.protein + recipesNutrition.protein,
    fat: productsNutrition.fat + recipesNutrition.fat,
    carbs: productsNutrition.carbs + recipesNutrition.carbs,
    fiber: (productsNutrition.fiber ?? 0) + (recipesNutrition.fiber ?? 0),
    animalProtein: productsNutrition.animalProtein + recipesNutrition.animalProtein,
    plantProtein: productsNutrition.plantProtein + recipesNutrition.plantProtein,
    otherProtein: productsNutrition.otherProtein + recipesNutrition.otherProtein,
  };
};
