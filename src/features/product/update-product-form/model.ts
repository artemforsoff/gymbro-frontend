import { createEffect, sample } from 'effector';
import { productModel } from '@/entities/product';
import { Product } from '@/entities/product/model/types';
import { api } from '@/shared/lib';

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
