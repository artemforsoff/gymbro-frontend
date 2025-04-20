import { type ComponentProps, type FC } from 'react';
import { ProductForm } from '@/entities/product';
import { type Product } from '@/entities/product/model/types';
import { useNotify } from '@/shared/ui/snackbar';
import { updateProductFx } from './model';
import { useUnit } from 'effector-react';

type UpdateProductFormProps = {
  onSuccess: () => void;
  product: Product;
};

export const UpdateProductForm: FC<UpdateProductFormProps> = ({ onSuccess, product }) => {
  const { success, error } = useNotify();
  const isLoading = useUnit(updateProductFx.pending);

  const updateProduct: ComponentProps<typeof ProductForm>['onSubmit'] = (data) => {
    updateProductFx({
      ...data,
      id: product.id,
    })
      .then(() => {
        onSuccess();
        success('Продукт успешно обновлен');
      })
      .catch(() => {
        error('Ой, произошла ошибка');
      });
  };

  return (
    <ProductForm
      onSubmit={updateProduct}
      submitButtonText="Обновить"
      initialValues={product}
      isLoading={isLoading}
    />
  );
};
