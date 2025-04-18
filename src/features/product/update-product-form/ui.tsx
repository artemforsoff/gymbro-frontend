import { type ComponentProps, type FC } from 'react';
import { ProductForm } from '@/entities/products';
import { type Product } from '@/entities/products/model/types';
import { useNotify } from '@/shared/ui/snackbar';
import { updateProductFx } from './model';

type UpdateProductFormProps = {
  onSuccess: () => void;
  product: Product;
};

export const UpdateProductForm: FC<UpdateProductFormProps> = ({ onSuccess, product }) => {
  const { success, error } = useNotify();

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
    <ProductForm onSubmit={updateProduct} submitButtonText="Обновить" initialValues={product} />
  );
};
