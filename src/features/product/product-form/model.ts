import { productModel } from '@/entities/products';
import { Product } from '@/entities/products/model/types';
import { api } from '@/shared/lib/api';
import { createEffect, sample } from 'effector';

export const createProductFx = createEffect((product: Omit<Product, 'id'>) => {
  return api
    .post('product', {
      json: product,
    })
    .json<Product>();
});

export const updateProductFx = createEffect(({ id, ...product }: Product) => {
  return api
    .put(`product/${id}`, {
      json: product,
    })
    .json<Product>();
});

sample({
  clock: [createProductFx.done, updateProductFx.done],
  target: productModel.effects.getProductsFx,
});
