import { type ComponentProps, type FC } from 'react';
import { ProductForm } from '@/entities/product';
import { updateProductFx } from './model';
import { useUnit } from 'effector-react';
import { toast } from 'react-toastify';
import { type Product } from '@/shared/types/entities';

type UpdateProductFormProps = {
  onSuccess: () => void;
  product: Product;
};

export const UpdateProductForm: FC<UpdateProductFormProps> = ({ onSuccess, product }) => {
  const isLoading = useUnit(updateProductFx.pending);

  const updateProduct: ComponentProps<typeof ProductForm>['onSubmit'] = (payload) => {
    updateProductFx({
      product: {
        ...payload.product,
        id: product.id,
      },
      file: payload.imageFile,
    })
      .then(() => {
        toast.success('Продукт успешно обновлен');
        onSuccess();
      })
      .catch(() => {
        toast.error('Произошла ошибка');
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
