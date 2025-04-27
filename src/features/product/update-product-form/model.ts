import { createEffect, sample } from 'effector';
import { productModel } from '@/entities/product';
import { api } from '@/shared/lib';
import { type Product } from '@/shared/types/entities';

export const updateProductFx = createEffect(
  ({
    product: { id, ...product },
    file,
  }: {
    product: Omit<Product, 'imageUrl'>;
    file?: File | null;
  }) => {
    const formData = new FormData();

    formData.append('dto', JSON.stringify(product));

    if (file) formData.append('image', file);

    return api
      .put(`product/${id}`, {
        body: formData,
      })
      .json<Product>();
  },
);

sample({
  clock: updateProductFx.doneData,
  target: productModel.effects.getProductsFx,
});
