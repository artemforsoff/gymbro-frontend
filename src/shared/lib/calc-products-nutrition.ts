import { type Nutrients, type Product } from '@/shared/types/entities';

export const calcProductsNutrition = (
  products: Array<{
    amount: string | number;
    product: Pick<Product, 'carbs' | 'fat' | 'fiber' | 'kcal' | 'protein'>;
  }>,
): Nutrients => {
  return products.reduce(
    (acc, { amount, product }) => {
      const grams = Number(amount);
      if (isNaN(grams)) return acc;

      const { carbs, fat, fiber, kcal, protein } = product;
      const factor = grams / 100;

      acc.kcal += Math.round(Number(kcal) * factor);
      acc.protein += Math.round(Number(protein) * factor);
      acc.fat += Math.round(Number(fat) * factor);
      acc.carbs += Math.round(Number(carbs) * factor);
      acc.fiber += Math.round(Number(fiber) * factor);

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
