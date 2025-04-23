import { type PageProps } from '@/pages/types';
import { IconButton, Input } from '@/shared/ui/kit';
import { ComponentProps, useState, type FC } from 'react';
import { $meals, getMealsFx, NutritionPageGate } from '../model';
import styles from './styles.module.scss';
import { useGate, useUnit } from 'effector-react';
import { CirclePlusIcon } from 'lucide-react';
import { useModal } from '@/shared/ui/modal';
import { CreateMealForm } from '@/features/meal';
import { ProductList } from '@/features/product';
import { productModel } from '@/entities/product';
import { recipeModel } from '@/entities/recipe';
import { RecipeList } from '@/features/recipe';
import { DateTime } from 'luxon';

export const NutritionPage: FC<PageProps> = () => {
  useGate(NutritionPageGate);

  const products = useUnit(productModel.stores.$products);
  const recipes = useUnit(recipeModel.stores.$recipes);
  const meals = useUnit($meals);

  const { openModal, closeModal } = useModal();

  const selectProducts: ComponentProps<typeof CreateMealForm>['onSelectProducts'] = () => {
    return new Promise((resolve) => {
      openModal({
        content: (
          <ProductList
            products={products || []}
            selectable
            onSelectProducts={(products) => {
              closeModal();
              resolve(products);
            }}
          />
        ),
        title: 'Выбрать продукты',
      });
    });
  };

  const selectRecipes: ComponentProps<typeof CreateMealForm>['onSelectRecipes'] = () => {
    return new Promise((resolve) => {
      openModal({
        content: (
          <RecipeList
            recipes={recipes || []}
            selectable
            onSelectRecipes={(recipes) => {
              closeModal();
              resolve(recipes);
            }}
          />
        ),
        title: 'Выбрать рецепты',
      });
    });
  };

  const [date, setDate] = useState(() => DateTime.now().toFormat('yyyy-MM-dd'));

  const handleCreateMeal = () => {
    openModal({
      content: (
        <CreateMealForm
          onSelectProducts={selectProducts}
          onSelectRecipes={selectRecipes}
          onSuccess={() => {
            getMealsFx({ date });
            closeModal();
          }}
        />
      ),
      title: 'Добавить прием пищи',
    });
  };

  return (
    <div className={styles['nutrition-page']}>
      <IconButton className={styles['add-button']} onClick={handleCreateMeal}>
        <CirclePlusIcon />
      </IconButton>

      <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

      <pre>{JSON.stringify(meals, null, 2)}</pre>
    </div>
  );
};
