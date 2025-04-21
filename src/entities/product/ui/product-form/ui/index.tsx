import { useEffect, type FC } from 'react';
import { useUnit } from 'effector-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toZodEnum } from '@/shared/lib';
import { PROTEIN_TYPES } from '@/shared/constants/product';
import { $productCategoryOptions, proteinTypeOptions } from '../shared/options';
import styles from './styles.module.scss';
import { Product } from '../../../model/types';
import { Button, Input, Select } from '@/shared/ui/kit';
import { decimalNumberSchema } from '@/shared/lib/zod';
import { toDecimals } from '@/shared/lib/to-decimals';

const productSchema = z.object({
  name: z.string().min(1, 'Название обязательно'),
  categoryId: z.number({ invalid_type_error: 'Выберите категорию' }),
  kcal: decimalNumberSchema(),
  protein: decimalNumberSchema(),
  fat: decimalNumberSchema(),
  carbs: decimalNumberSchema(),
  fiber: decimalNumberSchema(),
  proteinType: toZodEnum(Object.values(PROTEIN_TYPES)),
});

type ProductFormData = z.infer<typeof productSchema>;

type ProductFormProps = {
  initialValues?: Omit<Product, 'id'>;
  onSubmit: (data: Omit<Product, 'id'>) => void;
  submitButtonText: string;
  isLoading: boolean;
};

export const ProductForm: FC<ProductFormProps> = ({
  onSubmit,
  initialValues,
  submitButtonText,
  isLoading,
}) => {
  const categoryOptions = useUnit($productCategoryOptions);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    if (!initialValues) return;

    const { carbs, fat, fiber, kcal, protein } = initialValues;

    reset({
      ...initialValues,
      carbs: +carbs,
      fat: +fat,
      fiber: +fiber,
      kcal: +kcal,
      protein: +protein,
    });
  }, [initialValues, reset]);

  const submit = (data: ProductFormData) => {
    onSubmit({
      ...data,
      carbs: String(data.carbs),
      fat: String(data.fat),
      fiber: String(data.fiber),
      kcal: String(data.kcal),
      protein: String(data.protein),
      unit: '100g',
    });
  };

  const parseDecimalInput = (value: string) => {
    if (typeof value === 'string') {
      return toDecimals(parseFloat(value.replace(',', '.')), 2);
    }
    return toDecimals(value, 2);
  };

  return (
    <form className={styles['product-form']} onSubmit={handleSubmit(submit)}>
      <div className={styles['control--full-width']}>
        <Input
          className={styles.input}
          label="Название"
          error={errors.name?.message}
          {...register('name')}
        />
      </div>

      <div className={styles['control--full-width']}>
        <Select
          label="Категория"
          value={watch('categoryId')?.toString() ?? ''}
          onChange={(e) => setValue('categoryId', Number(e.target.value))}
          error={errors.categoryId?.message}
        >
          <option value="" />
          {categoryOptions.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </div>

      <Input
        label="К"
        type="text"
        inputMode="decimal"
        error={errors.kcal?.message}
        {...register('kcal', {
          setValueAs: parseDecimalInput,
        })}
      />

      <Input
        label="Б"
        type="text"
        inputMode="decimal"
        error={errors.protein?.message}
        {...register('protein', {
          setValueAs: parseDecimalInput,
        })}
      />

      <Input
        label="Ж"
        type="text"
        inputMode="decimal"
        error={errors.fat?.message}
        {...register('fat', {
          setValueAs: parseDecimalInput,
        })}
      />

      <Input
        label="У"
        type="text"
        inputMode="decimal"
        error={errors.carbs?.message}
        {...register('carbs', {
          setValueAs: parseDecimalInput,
        })}
      />

      <Input
        label="Клетчатка"
        type="text"
        inputMode="decimal"
        error={errors.fiber?.message}
        {...register('fiber', {
          setValueAs: parseDecimalInput,
        })}
      />

      <Select
        label="Тип белка"
        value={watch('proteinType')}
        onChange={(e) => setValue('proteinType', e.target.value as ProductFormData['proteinType'])}
        error={errors.proteinType?.message}
      >
        <option value="" />
        {Object.values(proteinTypeOptions).map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>

      <div className={styles['submit-button']}>
        <Button type="submit" loading={isLoading}>
          {submitButtonText}
        </Button>
      </div>
    </form>
  );
};
