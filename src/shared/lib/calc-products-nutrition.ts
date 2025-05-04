import { type Nutrients, type Product } from '@/shared/types/entities';
import { PROTEIN_TYPES } from '../constants/product';

export const calcProductsNutrition = (
  products: Array<{
    amount: string | number;
    product: Pick<Product, 'carbs' | 'fat' | 'fiber' | 'kcal' | 'protein' | 'proteinType'>;
  }>,
): Nutrients => {
  return products.reduce(
    (acc, { amount, product }) => {
      const grams = Number(amount);
      if (isNaN(grams)) return acc;

      const { carbs, fat, fiber, kcal, protein, proteinType } = product;
      const factor = grams / 100;
      const proteinGrams = Math.round(Number(protein) * factor);

      acc.kcal += Math.round(Number(kcal) * factor);
      acc.protein += proteinGrams;
      acc.fat += Math.round(Number(fat) * factor);
      acc.carbs += Math.round(Number(carbs) * factor);
      acc.fiber += Math.round(Number(fiber) * factor);

      switch (proteinType) {
        case PROTEIN_TYPES.animal:
          acc.animalProtein += proteinGrams;
          break;
        case PROTEIN_TYPES.plant:
          acc.plantProtein += proteinGrams;
          break;
        case PROTEIN_TYPES.mixed:
        case PROTEIN_TYPES.unknown:
          acc.otherProtein += proteinGrams;
          break;
      }

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
};
