import { z, ZodEnum } from 'zod';

export function toZodEnum<T extends string>(values: T[]): ZodEnum<[T, ...T[]]> {
  if (values.length === 0) {
    throw new Error('toZodEnum: values must be a non-empty array');
  }

  return z.enum(values as [T, ...T[]]);
}
