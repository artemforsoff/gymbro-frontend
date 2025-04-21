import { type ComponentProps, type FC } from 'react';
import { useUnit } from 'effector-react';
import { toast } from 'react-toastify';
import { createProductFx } from './model';
import { ProductForm } from '@/entities/product';

type CreateProductFormProps = {
  onSuccess: () => void;
};

export const CreateProductForm: FC<CreateProductFormProps> = ({ onSuccess }) => {
  const isLoading = useUnit(createProductFx.pending);

  const createProduct: ComponentProps<typeof ProductForm>['onSubmit'] = (data) => {
    createProductFx(data)
      .then(() => {
        onSuccess();
        toast.success('Продукт успешно добавлен');
      })
      .catch(() => {
        toast.error('Произошла ошибка');
      });
  };

  return <ProductForm onSubmit={createProduct} submitButtonText="Добавить" isLoading={isLoading} />;
};
