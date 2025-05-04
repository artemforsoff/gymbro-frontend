import { type FC } from 'react';
import { MealForm, type MealFormProps } from '.';
import { createMealFx } from '../model';
import { toast } from 'react-toastify';
import { useUnit } from 'effector-react';

type CreateMealFormProps = Pick<MealFormProps, 'onSelectProducts' | 'onSelectRecipes'> & {
  onSuccess?: () => void;
};

export const CreateMealForm: FC<CreateMealFormProps> = ({
  onSelectProducts,
  onSelectRecipes,
  onSuccess,
}) => {
  const isLoading = useUnit(createMealFx.pending);

  const handleSubmit: MealFormProps['onSubmit'] = ({
    name,
    products = [],
    recipes = [],
    datetime,
  }) => {
    createMealFx({ name, products, recipes, datetime: datetime.toISOString() }).then(() => {
      toast.success('Прием пищи успешно создан');
      onSuccess?.();
    });
  };

  return (
    <MealForm
      isLoading={isLoading}
      onSelectProducts={onSelectProducts}
      onSelectRecipes={onSelectRecipes}
      onSubmit={handleSubmit}
    />
  );
};
