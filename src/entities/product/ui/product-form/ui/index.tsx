import { useEffect, type FC } from 'react';
import { useUnit } from 'effector-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toZodEnum } from '@/shared/lib';
import { PROTEIN_TYPES } from '@/shared/constants/product';
import { $productCategoryOptions, proteinTypeOptions } from '../shared/options';
import styles from './styles.module.scss';
import { Product } from '@/entities/product/model/types';
import { Button, Input, Select } from '@/shared/ui/kit';

const MAX_DECIMALS = 2;
const toTwoDecimals = (val: number) => Number(val.toFixed(MAX_DECIMALS));

const twoDecimalSchema = z
  .number({ invalid_type_error: 'Введите число' })
  .min(0)
  .max(100)
  .refine((val) => toTwoDecimals(val) === val, {
    message: `Максимум ${MAX_DECIMALS} знака после запятой`,
  });

const productSchema = z.object({
  name: z.string().min(1, 'Название обязательно'),
  categoryId: z.number({ invalid_type_error: 'Выберите категорию' }),
  kcal: twoDecimalSchema,
  protein: twoDecimalSchema,
  fat: twoDecimalSchema,
  carbs: twoDecimalSchema,
  fiber: twoDecimalSchema,
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
        type="number"
        step="0.01"
        error={errors.kcal?.message}
        {...register('kcal', {
          valueAsNumber: true,
          setValueAs: toTwoDecimals,
        })}
      />

      <Input
        label="Б"
        type="number"
        step="0.01"
        error={errors.protein?.message}
        {...register('protein', {
          valueAsNumber: true,
          setValueAs: toTwoDecimals,
        })}
      />

      <Input
        label="Ж"
        type="number"
        step="0.01"
        error={errors.fat?.message}
        {...register('fat', {
          valueAsNumber: true,
          setValueAs: toTwoDecimals,
        })}
      />

      <Input
        label="У"
        type="number"
        step="0.01"
        error={errors.carbs?.message}
        {...register('carbs', {
          valueAsNumber: true,
          setValueAs: toTwoDecimals,
        })}
      />

      <Input
        label="Клетчатка"
        type="number"
        step="0.01"
        error={errors.fiber?.message}
        {...register('fiber', {
          valueAsNumber: true,
          setValueAs: toTwoDecimals,
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
