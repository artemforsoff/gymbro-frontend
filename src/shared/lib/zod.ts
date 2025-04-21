import { z, ZodEnum } from 'zod';
import { toDecimals } from './to-decimals';

export const decimalNumberSchema = (maxDecimals: number = 2) => {
  return z
    .number({ invalid_type_error: 'Введите число' })
    .positive('Число должно быть больше нуля')
    .refine((val) => toDecimals(val, maxDecimals) === val, {
      message: `Максимум ${maxDecimals} знака после запятой`,
    });
};

export function toZodEnum<T extends string>(values: T[]): ZodEnum<[T, ...T[]]> {
  if (values.length === 0) {
    throw new Error('toZodEnum: values must be a non-empty array');
  }

  return z.enum(values as [T, ...T[]]);
}
