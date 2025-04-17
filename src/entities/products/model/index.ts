import { createEffect, createStore, sample } from 'effector';
import type { Nullable } from '@/shared/types/utility-types';
import type { Product } from './types';
import { $productCategories, getProductCategoriesFx } from './categories';
import { api } from '@/shared/lib/api';

const $products = createStore<Nullable<Product[]>>(null);

const getProductsFx = createEffect(() => {
  return api.get('product/user/me').json<Product[]>();
});

$products.on(getProductsFx.doneData, (_, products) => products);

const deleteProductFx = createEffect((id: Product['id']) => {
  return api.delete(`product/${id}`).json();
});

sample({
  clock: deleteProductFx.doneData,
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
    deleteProductFx,
  },
};
