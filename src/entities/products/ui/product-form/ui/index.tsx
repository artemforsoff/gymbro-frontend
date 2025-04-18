import { useEffect, type FC } from 'react';
import { useUnit } from 'effector-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Select, Button } from '@telegram-apps/telegram-ui';
import { toZodEnum } from '@/shared/lib/to-zod-enum';
import { PROTEIN_TYPES } from '@/shared/constants/product';
import { $productCategoryOptions, proteinTypeOptions } from '../shared/options';
import styles from './styles.module.scss';
import { Product } from '@/entities/products/model/types';

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
};

export const ProductForm: FC<ProductFormProps> = ({
  onSubmit,
  initialValues,
  submitButtonText,
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
          header="Название"
          status={errors.name ? 'error' : undefined}
          {...register('name')}
        />
      </div>

      <div className={styles['control--full-width']}>
        <Select
          header="Категория"
          value={watch('categoryId')?.toString() ?? ''}
          onChange={(e) => setValue('categoryId', Number(e.target.value))}
          status={errors.categoryId ? 'error' : undefined}
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
        header="К"
        type="number"
        step="0.01"
        status={errors.kcal ? 'error' : undefined}
        {...register('kcal', {
          valueAsNumber: true,
          setValueAs: toTwoDecimals,
        })}
      />

      <Input
        header="Б"
        type="number"
        step="0.01"
        status={errors.protein ? 'error' : undefined}
        {...register('protein', {
          valueAsNumber: true,
          setValueAs: toTwoDecimals,
        })}
      />

      <Input
        header="Ж"
        type="number"
        step="0.01"
        status={errors.fat ? 'error' : undefined}
        {...register('fat', {
          valueAsNumber: true,
          setValueAs: toTwoDecimals,
        })}
      />

      <Input
        header="У"
        type="number"
        step="0.01"
        status={errors.carbs ? 'error' : undefined}
        {...register('carbs', {
          valueAsNumber: true,
          setValueAs: toTwoDecimals,
        })}
      />

      <Input
        header="Клетчатка"
        type="number"
        step="0.01"
        status={errors.fiber ? 'error' : undefined}
        {...register('fiber', {
          valueAsNumber: true,
          setValueAs: toTwoDecimals,
        })}
      />

      <Select
        header="Тип белка"
        value={watch('proteinType')}
        onChange={(e) => setValue('proteinType', e.target.value as ProductFormData['proteinType'])}
        status={errors.proteinType ? 'error' : undefined}
      >
        <option value="" />
        {Object.values(proteinTypeOptions).map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>

      <div className={styles['submit-button']}>
        <Button type="submit">{submitButtonText}</Button>
      </div>
    </form>
  );
};
