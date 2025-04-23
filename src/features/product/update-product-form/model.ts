import { createEffect, sample } from 'effector';
import { productModel } from '@/entities/product';
import { api } from '@/shared/lib';
import { type Product } from '@/shared/types/entities';

export const updateProductFx = createEffect(({ id, ...product }: Product) => {
  return api
    .put(`product/${id}`, {
      json: product,
    })
    .json<Product>();
});

sample({
  clock: updateProductFx.doneData,
  target: productModel.effects.getProductsFx,
});
