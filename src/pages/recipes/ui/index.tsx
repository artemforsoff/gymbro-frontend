import { ComponentProps, type FC } from 'react';
import { useGate, useUnit } from 'effector-react';
import { CirclePlusIcon } from 'lucide-react';
import { type PageProps } from '@/pages/types';
import { CreateRecipeForm, RecipeList } from '@/features/recipe';
import { ProductList } from '@/features/product';
import { IconButton } from '@/shared/ui/kit';
import { RecipesPageGate } from '../model';
import { recipeModel } from '@/entities/recipe';
import { useModal } from '@/shared/ui/modal';
import { productModel } from '@/entities/product';
import { type Product } from '@/entities/product/model/types';
import styles from './styles.module.scss';
import { UpdateRecipeForm } from '@/features/recipe/update-recipe-form/ui';
import { toast } from 'react-toastify';

export const RecipesPage: FC<PageProps> = () => {
  useGate(RecipesPageGate);

  const { openModal, closeModal } = useModal();

  const recipes = useUnit(recipeModel.stores.$recipes);
  const products = useUnit(productModel.stores.$products);

  const selectProduct = (): Promise<Product> => {
    return new Promise((resolve) => {
      openModal({
        content: (
          <ProductList
            products={products || []}
            selectable
            onSelectProduct={(product) => {
              resolve(product);
              closeModal();
            }}
          />
        ),
        title: 'Выбрать продукт',
      });
    });
  };

  const createRecipe = () => {
    openModal({
      content: <CreateRecipeForm onAddProduct={selectProduct} onSuccess={closeModal} />,
      title: 'Добавить рецепт',
    });
  };

  const updateRecipe: ComponentProps<typeof RecipeList>['onChangeRecipe'] = (recipe) => {
    openModal({
      content: (
        <UpdateRecipeForm onSuccess={closeModal} recipe={recipe} onAddProduct={selectProduct} />
      ),
      title: 'Редактировать рецепт',
    });
  };

  const deleteRecipe: ComponentProps<typeof RecipeList>['onDeleteRecipe'] = ({ id }) => {
    recipeModel.effects.deleteRecipeFx(id).then(() => {
      toast.success('Рецепт успешно удален');
    });
  };

  return (
    <div className={styles['recipes-page']}>
      <IconButton className={styles['add-button']} onClick={createRecipe}>
        <CirclePlusIcon />
      </IconButton>

      <RecipeList
        recipes={recipes || []}
        onCreateRecipe={createRecipe}
        onChangeRecipe={updateRecipe}
        onDeleteRecipe={deleteRecipe}
      />
    </div>
  );
};
