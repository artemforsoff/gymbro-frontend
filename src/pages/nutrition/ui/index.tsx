import { type PageProps } from '@/pages/types';
import { IconButton } from '@/shared/ui/kit';
import { type ComponentProps, type FC } from 'react';
import { useGate, useUnit } from 'effector-react';
import { CirclePlusIcon } from 'lucide-react';
import { CreateMealForm, MealHistory } from '@/features/meal';
import { NutritionPageGate, mealCreated, mealDeleted } from '../model';
import { ProductList } from '@/features/product';
import { productModel } from '@/entities/product';
import { recipeModel } from '@/entities/recipe';
import { RecipeList } from '@/features/recipe';
import { userModel } from '@/entities/user/model';
import { useModal } from '@/shared/ui/modal';
import styles from './styles.module.scss';

export const NutritionPage: FC<PageProps> = () => {
  useGate(NutritionPageGate);

  const products = useUnit(productModel.stores.$products);
  const recipes = useUnit(recipeModel.stores.$recipes);
  const meals = useUnit(userModel.stores.$mealsInActivityDay);

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

  const handleCreateMeal = () => {
    openModal({
      content: (
        <CreateMealForm
          onSelectProducts={selectProducts}
          onSelectRecipes={selectRecipes}
          onSuccess={() => {
            mealCreated();
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

      <MealHistory meals={meals || []} onSuccessDelete={mealDeleted} onAddMeal={handleCreateMeal} />
    </div>
  );
};
