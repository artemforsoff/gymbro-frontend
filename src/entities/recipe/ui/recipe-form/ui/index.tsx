import { useEffect, useState, type FC } from 'react';
import { z } from 'zod';
import { decimalNumberSchema, toDecimals } from '@/shared/lib';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './styles.module.scss';
import { Button, IconButton, Input } from '@/shared/ui/kit';
import { CirclePlusIcon, XIcon } from 'lucide-react';
import clsx from 'clsx';
import { type Product, type Recipe } from '@/shared/types/entities';

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
  onAddProduct?: () => Promise<Product[]>;
  isLoading: boolean;
  submitButtonText: string;
};

export const RecipeForm: FC<RecipeFormProps> = ({
  onSubmit,
  onAddProduct,
  isLoading,
  submitButtonText,
  initialValues,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
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

  useEffect(() => {
    if (initialValues) {
      reset({
        ...initialValues,
        products:
          initialValues.products?.map(({ amount, productId }) => ({
            productId,
            amount: Number(amount),
          })) ?? [],
      });
    }
  }, [initialValues, reset]);

  useEffect(() => {
    if (initialValues?.products) {
      setSelectedProducts(
        initialValues.products.reduce(
          (acc, { productId, product }) => ({ ...acc, [productId]: product }),
          {},
        ),
      );
    }
  }, [initialValues?.products]);

  const parseDecimalInput = (value: string) => {
    if (typeof value === 'string') {
      return toDecimals(parseFloat(value.replace(',', '.')), 2);
    }
    return toDecimals(value, 2);
  };

  const handleAddProduct = () => {
    onAddProduct?.().then((products) => {
      const notExistProducts = products.filter((product) => !selectedProducts[product.id]);

      notExistProducts.forEach((product) => {
        appendProduct({ productId: product.id, amount: 0 });

        setSelectedProducts((prev) => ({
          ...prev,
          [product.id]: product,
        }));
      });
    });
  };

  const productsErrorMessage = errors.products?.message || errors.products?.root?.message;

  const handleRemoveProduct = ({
    index,
    productId,
  }: {
    productId: Product['id'];
    index: number;
  }) => {
    removeProduct(index);

    setSelectedProducts((prev) => {
      const newSelectedProducts = { ...prev };
      delete newSelectedProducts[productId];

      return newSelectedProducts;
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
              <span>Вес(г)</span>
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

                  <IconButton
                    type="button"
                    onClick={() => handleRemoveProduct({ index, productId })}
                  >
                    <XIcon />
                  </IconButton>
                </li>
              );
            })}
          </ul>
        )}

        <footer>
          {productsErrorMessage && <p className={styles.error}>{productsErrorMessage}</p>}

          <IconButton type="button" className={styles.products__add} onClick={handleAddProduct}>
            <CirclePlusIcon />
          </IconButton>
        </footer>
      </figure>

      <Input label="Описание" error={errors.description?.message} {...register('description')} />

      <Button type="submit" className={styles.submit} loading={isLoading}>
        {submitButtonText}
      </Button>
    </form>
  );
};
