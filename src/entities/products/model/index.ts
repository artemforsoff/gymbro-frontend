import { createEffect, createStore, sample } from 'effector';
import type { Nullable } from '@/shared/types/utility-types';
import type { Product } from './types';
import { $productCategories, getProductCategoriesFx } from './categories';
import { api } from '@/shared/lib/api';

export const $products = createStore<Nullable<Product[]>>(null);

export const getProductsFx = createEffect(() => {
  return api.get('product/user/me').json<Product[]>();
});

$products.on(getProductsFx.doneData, (_, products) => products);

export const createProductFx = createEffect((product: Omit<Product, 'id'>) => {
  return api
    .post('product', {
      json: product,
    })
    .json<Product>();
});

sample({
  clock: createProductFx.done,
  target: getProductsFx,
});

export const productModel = {
  stores: {
    $products,
    $productCategories,
  },
  effects: {
    getProductCategoriesFx,
    getProductsFx,
    createProductFx,
  },
};
