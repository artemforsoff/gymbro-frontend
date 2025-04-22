import { type ComponentProps, type FC } from 'react';
import { useUnit } from 'effector-react';
import { toast } from 'react-toastify';
import { updateRecipeFx } from './model';
import { RecipeForm } from '@/entities/recipe';
import { type Recipe } from '@/entities/recipe/model/types';

type UpdateCreateRecipeFormProps = {
  recipe: Recipe;
  onSuccess?: () => void;
  onAddProduct?: ComponentProps<typeof RecipeForm>['onAddProduct'];
};

export const UpdateRecipeForm: FC<UpdateCreateRecipeFormProps> = ({
  recipe,
  onSuccess,
  onAddProduct,
}) => {
  const isLoading = useUnit(updateRecipeFx.pending);

  const createRecipe: ComponentProps<typeof RecipeForm>['onSubmit'] = ({
    name,
    products,
    description = '',
  }) => {
    updateRecipeFx({
      id: recipe.id,
      name,
      description,
      isPublic: false,
      productList: products,
    })
      .then(() => {
        onSuccess?.();
        toast.success('Рецепт успешно добавлен');
      })
      .catch(() => {
        toast.error('Произошла ошибка');
      });
  };

  return (
    <RecipeForm
      onSubmit={createRecipe}
      onAddProduct={onAddProduct}
      initialValues={recipe}
      isLoading={isLoading}
      submitButtonText="Обновить"
    />
  );
};
