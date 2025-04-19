import { ProductForm } from '@/entities/products';
import { type ComponentProps, type FC } from 'react';
import { createProductFx } from './model';
import { useNotify } from '@/shared/ui/snackbar';
import { useUnit } from 'effector-react';

type CreateProductFormProps = {
  onSuccess: () => void;
};

export const CreateProductForm: FC<CreateProductFormProps> = ({ onSuccess }) => {
  const { success, error } = useNotify();
  const isLoading = useUnit(createProductFx.pending);

  const createProduct: ComponentProps<typeof ProductForm>['onSubmit'] = (data) => {
    createProductFx(data)
      .then(() => {
        onSuccess();
        success('Продукт успешно добавлен');
      })
      .catch(() => {
        error('Ой, произошла ошибка');
      });
  };

  return <ProductForm onSubmit={createProduct} submitButtonText="Добавить" isLoading={isLoading} />;
};
