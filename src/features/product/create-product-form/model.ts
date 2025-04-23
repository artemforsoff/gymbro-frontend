import { createEffect, sample } from 'effector';
import { productModel } from '@/entities/product';
import { api } from '@/shared/lib';
import { type Product } from '@/shared/types/entities';

export const createProductFx = createEffect((product: Omit<Product, 'id'>) => {
  return api
    .post('product', {
      json: product,
    })
    .json<Product>();
});

sample({
  clock: createProductFx.doneData,
  target: productModel.effects.getProductsFx,
});
