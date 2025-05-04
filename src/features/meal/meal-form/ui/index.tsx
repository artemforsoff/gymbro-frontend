import { useState, type FC } from 'react';
import { Button, DatePicker, DropdownMenu, IconButton, Input } from '@/shared/ui/kit';
import styles from './styles.module.scss';
import { type Product, type Recipe } from '@/shared/types/entities';
import { CirclePlusIcon, XIcon } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { mealSchema, type MealSchema } from '../lib/validation-schema';
import { toDecimals } from '@/shared/lib';

export type MealFormProps = {
  onSelectProducts: () => Promise<Product[]>;
  onSelectRecipes: () => Promise<Recipe[]>;
  onSubmit: (data: MealSchema) => void;
  isLoading?: boolean;
};

export const MealForm: FC<MealFormProps> = ({
  onSelectProducts,
  onSelectRecipes,
  onSubmit,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitted },
    watch,
    control,
  } = useForm({
    resolver: zodResolver(mealSchema),
    defaultValues: {
      products: [],
      recipes: [],
      datetime: new Date(),
    },
  });
  const products = watch('products');
  const recipes = watch('recipes');

  const isEmpty = !products?.length && !recipes?.length;

  const [selectedProductsMap, setSelectedProductsMap] = useState<Record<Product['id'], Product>>(
    {},
  );
  const [selectedRecipesMap, setSelectedRecipesMap] = useState<Record<Recipe['id'], Recipe>>({});

  const handleSelectProducts = async () => {
    const selectedProducts = await onSelectProducts();
    const currentProducts = getValues('products') ?? [];

    const newProducts = selectedProducts.filter(({ id }) => !selectedProductsMap[id]);

    setSelectedProductsMap((prev) => {
      const updated = { ...prev };
      newProducts.forEach((product) => {
        updated[product.id] = product;
      });
      return updated;
    });

    setValue('products', [
      ...currentProducts,
      ...newProducts.map(({ id: productId }) => ({
        productId,
        amount: 100,
      })),
    ]);
  };

  const handleSelectRecipes = async () => {
    const selectedRecipes = await onSelectRecipes();
    const currentRecipes = getValues('recipes') ?? [];

    const newRecipes = selectedRecipes.filter(({ id }) => !selectedRecipesMap[id]);

    setSelectedRecipesMap((prev) => {
      const updated = { ...prev };
      newRecipes.forEach((recipe) => {
        updated[recipe.id] = recipe;
      });
      return updated;
    });

    const updatedRecipes = [
      ...currentRecipes,
      ...newRecipes.map(({ id: recipeId, products }) => ({
        recipeId,
        portions: 1,
        customProducts: products.map(({ productId, amount }) => ({
          productId,
          amount: Number(amount),
        })),
      })),
    ];

    setValue('recipes', updatedRecipes);
  };

  const handleRemoveProduct = ({ index, productId }: { index: number; productId: number }) => {
    const products = getValues('products');

    if (products) {
      setValue(
        'products',
        products.filter((_, i) => i !== index),
      );
    }

    setSelectedProductsMap((prev) => {
      const { [productId]: _, ...rest } = prev;
      return rest;
    });
  };

  const parseDecimalInput = (value: string) => {
    if (typeof value === 'string') {
      return toDecimals(parseFloat(value.replace(',', '.')), 2);
    }
    return toDecimals(value, 2);
  };

  const handleRemoveRecipe = ({ index, recipeId }: { index: number; recipeId: number }) => {
    const recipes = getValues('recipes');

    if (recipes) {
      setValue(
        'recipes',
        recipes.filter((_, i) => i !== index),
      );
    }

    setSelectedRecipesMap((prev) => {
      const { [recipeId]: _, ...rest } = prev;
      return rest;
    });
  };

  const handleRemoveProductFromRecipe = ({
    recipeIndex,
    productId,
  }: {
    recipeIndex: number;
    productId: number;
  }) => {
    setValue(
      `recipes.${recipeIndex}.customProducts`,
      getValues(`recipes.${recipeIndex}.customProducts`).filter(
        ({ productId: currentProductId }) => currentProductId !== productId,
      ),
    );
  };

  return (
    <form className={styles['meal-form']} onSubmit={handleSubmit(onSubmit)}>
      <Input label="Название" error={errors.name?.message} {...register('name')} />

      <Controller
        name="datetime"
        control={control}
        render={({ field: { value, onChange } }) => (
          <DatePicker
            selected={value}
            onChange={onChange}
            showTimeSelect
            dateFormat="yyyy-MM-dd HH:mm"
            timeFormat="HH:mm"
            timeIntervals={15}
            placeholderText="Выберите дату и время"
            label="Время приёма"
            error={errors.datetime?.message}
          />
        )}
      />

      <figure className={styles.positions}>
        <figcaption className={styles.positions__label}>Позиции</figcaption>

        {!isEmpty && (
          <ul className={styles.positions__list}>
            {recipes?.map(({ recipeId, customProducts }, recipeIndex) => {
              const recipe = selectedRecipesMap[recipeId];

              return (
                <li className={clsx(styles.position, styles['position--recipe'])}>
                  <header className={styles.position__header}>
                    <p className={styles.position__name}>
                      <span>Блюдо: </span>
                      {recipe.name}
                    </p>

                    <Input
                      label="Порциии"
                      type="text"
                      inputMode="decimal"
                      error={errors.recipes?.[recipeIndex]?.portions?.message}
                      {...register(`recipes.${recipeIndex}.portions`, {
                        setValueAs: parseDecimalInput,
                      })}
                    />

                    <IconButton
                      type="button"
                      onClick={() => handleRemoveRecipe({ index: recipeIndex, recipeId })}
                    >
                      <XIcon />
                    </IconButton>
                  </header>

                  <ul className={styles.position__products}>
                    {customProducts.map(({ productId }, recipeProductIndex) => {
                      const recipeProduct = recipe.products.find((p) => p.productId === productId);

                      if (!recipeProduct) return null;
                      return (
                        <li className={styles.position}>
                          <header className={styles.position__header}>
                            <p className={styles.position__name}>
                              <span>Ингредиент: </span>
                              {recipeProduct.product.name}
                            </p>

                            <Input
                              type="text"
                              inputMode="decimal"
                              postfix="г"
                              error={
                                errors.recipes?.[recipeIndex]?.customProducts?.[recipeProductIndex]
                                  ?.amount?.message
                              }
                              {...register(
                                `recipes.${recipeIndex}.customProducts.${recipeProductIndex}.amount`,
                                {
                                  setValueAs: parseDecimalInput,
                                },
                              )}
                            />

                            <IconButton
                              type="button"
                              onClick={() =>
                                handleRemoveProductFromRecipe({
                                  recipeIndex,
                                  productId: recipeProduct.productId,
                                })
                              }
                            >
                              <XIcon />
                            </IconButton>
                          </header>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}

            {products?.map(({ productId }, productIndex) => {
              const product = selectedProductsMap[productId];

              return (
                <li className={styles.position}>
                  <header className={styles.position__header}>
                    <p className={styles.position__name}>
                      <span>Продукт: </span>
                      {product.name}
                    </p>

                    <Input
                      type="text"
                      inputMode="decimal"
                      error={errors.products?.[productIndex]?.amount?.message}
                      postfix="г"
                      {...register(`products.${productIndex}.amount`, {
                        setValueAs: parseDecimalInput,
                      })}
                    />

                    <IconButton
                      type="button"
                      onClick={() => handleRemoveProduct({ index: productIndex, productId })}
                    >
                      <XIcon />
                    </IconButton>
                  </header>
                </li>
              );
            })}
          </ul>
        )}

        {isEmpty && isSubmitted && <p className={styles.positions__empty}>Нет позиций</p>}

        <DropdownMenu
          placement="bottom-start"
          triggerClassName={styles['select-button']}
          trigger={
            <IconButton>
              <CirclePlusIcon />
            </IconButton>
          }
        >
          <DropdownMenu.Item onClick={handleSelectProducts}>Продукты</DropdownMenu.Item>
          <DropdownMenu.Item onClick={handleSelectRecipes}>Рецепты</DropdownMenu.Item>
        </DropdownMenu>
      </figure>

      <Button type="submit" className={styles['submit-button']} loading={isLoading}>
        Сохранить
      </Button>
    </form>
  );
};
