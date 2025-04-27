import { decimalNumberSchema } from '@/shared/lib';
import { z } from 'zod';

const productInputSchema = z.object({
  productId: z.number(),
  amount: decimalNumberSchema(),
});

const recipeInputSchema = z.object({
  recipeId: z.number(),
  portions: decimalNumberSchema(),
  customProducts: z.array(
    z.object({
      productId: z.number(),
      amount: decimalNumberSchema(),
    }),
  ),
});

export const mealSchema = z.object({
  name: z.string().min(1, 'Название обязательно'),
  products: z.array(productInputSchema).optional(),
  recipes: z.array(recipeInputSchema).optional(),
  datetime: z.string().refine((val) => /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(val), {
    message: 'Введите корректную дату и время',
  }),
});

export type MealSchema = z.infer<typeof mealSchema>;
