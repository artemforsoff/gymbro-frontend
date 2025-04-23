import { type FC } from 'react';
import { MealForm, type MealFormProps } from '.';
import { createMealFx } from '../model';
import { toast } from 'react-toastify';

type CreateMealFormProps = Pick<MealFormProps, 'onSelectProducts' | 'onSelectRecipes'> & {
  onSuccess?: () => void;
};

export const CreateMealForm: FC<CreateMealFormProps> = ({
  onSelectProducts,
  onSelectRecipes,
  onSuccess,
}) => {
  const handleSubmit: MealFormProps['onSubmit'] = ({ name, products = [], recipes = [] }) => {
    createMealFx({ name, products, recipes }).then(() => {
      toast.success('Прием пищи успешно создан');
      onSuccess?.();
    });
  };

  return (
    <MealForm
      onSelectProducts={onSelectProducts}
      onSelectRecipes={onSelectRecipes}
      onSubmit={handleSubmit}
    />
  );
};
