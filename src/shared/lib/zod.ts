import { z, ZodEnum } from 'zod';
import { toDecimals } from './to-decimals';

export const floatNumberSchema = ({
  maxDecimals = 2,
  positive = false,
}: {
  positive?: boolean;
  maxDecimals?: number;
} = {}) => {
  let schema = z.number({ invalid_type_error: 'Введите число' });

  if (positive) {
    schema = schema.positive('Число должно быть больше нуля');
  }

  return schema.refine((val) => toDecimals(val, maxDecimals) === val, {
    message: `Максимум ${maxDecimals} знака после запятой`,
  });
};

export const optionalFloatNumberSchema = () => {
  return z.preprocess(
    (val) => (val === '' || val === null || val === undefined ? undefined : Number(val)),
    z.number({ invalid_type_error: 'Введите число' }).optional(),
  );
};

export function toZodEnum<T extends string>(values: T[]): ZodEnum<[T, ...T[]]> {
  if (values.length === 0) {
    throw new Error('toZodEnum: values must be a non-empty array');
  }

  return z.enum(values as [T, ...T[]]);
}
