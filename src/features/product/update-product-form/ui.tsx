import { type ComponentProps, type FC } from 'react';
import { ProductForm } from '@/entities/product';
import { type Product } from '@/entities/product/model/types';
import { updateProductFx } from './model';
import { useUnit } from 'effector-react';

type UpdateProductFormProps = {
  onSuccess: () => void;
  product: Product;
};

export const UpdateProductForm: FC<UpdateProductFormProps> = ({ onSuccess, product }) => {
  const isLoading = useUnit(updateProductFx.pending);

  const updateProduct: ComponentProps<typeof ProductForm>['onSubmit'] = (data) => {
    updateProductFx({
      ...data,
      id: product.id,
    })
      .then(() => {
        onSuccess();
      })
      .catch(() => {});
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
