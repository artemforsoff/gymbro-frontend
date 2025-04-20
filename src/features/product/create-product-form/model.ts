import { createEffect, sample } from 'effector';
import { productModel } from '@/entities/product';
import { Product } from '@/entities/product/model/types';
import { api } from '@/shared/lib';

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
