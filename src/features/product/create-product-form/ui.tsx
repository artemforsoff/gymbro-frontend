import { ProductForm } from '@/entities/product';
import { type ComponentProps, type FC } from 'react';
import { createProductFx } from './model';
import { useUnit } from 'effector-react';

type CreateProductFormProps = {
  onSuccess: () => void;
};

export const CreateProductForm: FC<CreateProductFormProps> = ({ onSuccess }) => {
  const isLoading = useUnit(createProductFx.pending);

  const createProduct: ComponentProps<typeof ProductForm>['onSubmit'] = (data) => {
    createProductFx(data)
      .then(() => {
        onSuccess();
      })
      .catch(() => {});
  };

  return <ProductForm onSubmit={createProduct} submitButtonText="Добавить" isLoading={isLoading} />;
};
