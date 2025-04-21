import { type ComponentProps, type FC } from 'react';
import { useUnit } from 'effector-react';
import { toast } from 'react-toastify';
import { createRecipeFx } from './model';
import { RecipeForm } from '@/entities/recipe';

type CreateRecipeFormProps = {
  onSuccess?: () => void;
  onAddProduct?: ComponentProps<typeof RecipeForm>['onAddProduct'];
};

export const CreateRecipeForm: FC<CreateRecipeFormProps> = ({ onSuccess, onAddProduct }) => {
  const isLoading = useUnit(createRecipeFx.pending);

  const createRecipe: ComponentProps<typeof RecipeForm>['onSubmit'] = ({
    name,
    products,
    description = '',
  }) => {
    createRecipeFx({
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

  return <RecipeForm onSubmit={createRecipe} onAddProduct={onAddProduct} />;
};
