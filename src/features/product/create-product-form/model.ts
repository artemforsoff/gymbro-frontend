import { createEffect, sample } from 'effector';
import { productModel } from '@/entities/product';
import { api } from '@/shared/lib';
import { type Product } from '@/shared/types/entities';

export const createProductFx = createEffect(
  ({ product, file }: { product: Omit<Product, 'id' | 'imageUrl'>; file?: File | null }) => {
    const formData = new FormData();

    formData.append('dto', JSON.stringify(product));

    if (file) formData.append('image', file);

    return api
      .post('product', {
        body: formData,
      })
      .json<Product>();
  },
);

sample({
  clock: createProductFx.doneData,
  target: productModel.effects.getProductsFx,
});
