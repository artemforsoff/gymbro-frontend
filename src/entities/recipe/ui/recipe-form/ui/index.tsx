import { useState, type FC } from 'react';
import { type Recipe } from '../../../model/types';
import { z } from 'zod';
import { decimalNumberSchema, toDecimals } from '@/shared/lib';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './styles.module.scss';
import { Button, IconButton, Input } from '@/shared/ui/kit';
import { type Product } from '@/entities/product/model/types';
import { CirclePlusIcon, XIcon } from 'lucide-react';
import clsx from 'clsx';

const recipeSchema = z.object({
  name: z.string().min(1, 'Название обязательно'),
  description: z.string().optional(),
  products: z
    .array(
      z.object({
        productId: z.number({ invalid_type_error: 'Выберите продукт' }),
        amount: decimalNumberSchema(),
      }),
    )
    .min(1, 'Добавьте хотя бы один продукт'),
});

type RecipeFormData = z.infer<typeof recipeSchema>;

type RecipeFormProps = {
  initialValues?: Omit<Recipe, 'id'>;
  onSubmit: (data: RecipeFormData) => void;
  onAddProduct?: () => Promise<Product>;
};

export const RecipeForm: FC<RecipeFormProps> = ({ onSubmit, onAddProduct }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // setValue,
    control,
    // reset,
  } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      products: [],
    },
  });

  const {
    fields: products,
    append: appendProduct,
    remove: removeProduct,
  } = useFieldArray({
    name: 'products',
    control,
  });

  const [selectedProducts, setSelectedProducts] = useState<Record<Product['id'], Product>>({});

  // useEffect(() => {
  //   if (initialValues) {
  //     reset({
  //       ...initialValues,
  //       products:
  //         initialValues.products?.map((p) => ({
  //           ...p,
  //           amount: +p.amount,
  //         })) ?? [],
  //     });
  //   }
  // }, [initialValues, reset]);

  const parseDecimalInput = (value: string) => {
    if (typeof value === 'string') {
      return toDecimals(parseFloat(value.replace(',', '.')), 2);
    }
    return toDecimals(value, 2);
  };

  const handleAddProduct = () => {
    onAddProduct?.().then((product) => {
      if (selectedProducts[product.id]) return;

      appendProduct({ productId: product.id, amount: 0 });
      setSelectedProducts((prev) => ({ ...prev, [product.id]: product }));
    });
  };

  return (
    <form className={styles['recipe-form']} onSubmit={handleSubmit(onSubmit)}>
      <Input label="Название" error={errors.name?.message} {...register('name')} />

      <figure className={styles.products}>
        <figcaption className={styles.products__label}>Ингредиенты</figcaption>

        {Boolean(products.length) && (
          <ul className={styles.products__list}>
            <li className={clsx(styles.product, styles['product-captions'])}>
              <span>Название</span>
              <span>Вес</span>
            </li>

            {products.map(({ productId }, index) => {
              const { name } = selectedProducts[productId];

              return (
                <li key={index} className={styles.product}>
                  <p className={styles.product__name}>{name}</p>

                  <Input
                    type="text"
                    inputMode="decimal"
                    error={errors.products?.[index]?.amount?.message}
                    {...register(`products.${index}.amount`, {
                      setValueAs: parseDecimalInput,
                    })}
                  />

                  <IconButton type="button" onClick={() => removeProduct(index)}>
                    <XIcon />
                  </IconButton>
                </li>
              );
            })}
          </ul>
        )}

        <footer>
          {errors.products?.message && <p className={styles.error}>{errors.products?.message}</p>}

          <IconButton type="button" className={styles.products__add} onClick={handleAddProduct}>
            <CirclePlusIcon />
          </IconButton>
        </footer>
      </figure>

      <Input label="Описание" error={errors.description?.message} {...register('description')} />

      <Button type="submit" className={styles.submit}>
        Сохранить
      </Button>
    </form>
  );
};
