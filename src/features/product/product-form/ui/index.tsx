import { type Product } from '@/entities/products/model/types';
import { useEffect, type FC } from 'react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Select, Button } from '@telegram-apps/telegram-ui';
import { useNotify } from '@/shared/ui/snackbar/use-notify';
import { toZodEnum } from '@/shared/lib/to-zod-enum';
import styles from './styles.module.scss';
import { PROTEIN_TYPES } from '@/shared/constants/product';
import { useUnit } from 'effector-react';
import { $productCategoryOptions, proteinTypeOptions } from '../shared/options';
import { createProductFx, updateProductFx } from '../model';

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

type CreateProductFormBaseProps<T> = T & {
  onSuccess: () => void;
};

type CreateProductFormProps = CreateProductFormBaseProps<{ mode: 'create' }>;

type CreateUpdateFormProps = CreateProductFormBaseProps<{ mode: 'update'; entity: Product }>;

type ProductFormProps = CreateProductFormProps | CreateUpdateFormProps;

export const ProductForm: FC<ProductFormProps> = (props) => {
  const { mode, onSuccess } = props;

  const notify = useNotify();

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
    defaultValues: {},
  });

  useEffect(() => {
    if (mode === 'update') {
      const { entity } = props;

      reset({
        ...entity,
        carbs: Number(entity.carbs),
        fat: Number(entity.fat),
        fiber: Number(entity.fiber),
        kcal: Number(entity.kcal),
        protein: Number(entity.protein),
      });
    }
  }, [props]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      const { mode } = props;

      const payload: Parameters<typeof createProductFx>[0] = {
        ...data,
        carbs: String(data.carbs),
        fat: String(data.fat),
        fiber: String(data.fiber),
        kcal: String(data.kcal),
        protein: String(data.protein),
        unit: '100g',
      };

      if (mode === 'create') {
        await createProductFx(payload);
        notify.success('Продукт создан');
        onSuccess();
      } else if (mode === 'update') {
        const { entity } = props;

        await updateProductFx({
          ...payload,
          id: entity.id,
          unit: entity.unit,
        });
        notify.success('Продукт обновлен');
        onSuccess();
      }
    } catch {
      notify.error('Произошла ошибка');
    }
  };

  return (
    <form className={styles['product-form']} onSubmit={handleSubmit(onSubmit)}>
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
        <Button type="submit">{mode === 'update' ? 'Обновить' : 'Создать'}</Button>
      </div>
    </form>
  );
};
