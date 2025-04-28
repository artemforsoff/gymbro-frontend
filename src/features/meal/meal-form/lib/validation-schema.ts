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
  datetime: z.date({
    required_error: 'Дата и время обязательны',
    invalid_type_error: 'Введите корректную дату и время',
  }),
});

export type MealSchema = z.infer<typeof mealSchema>;
