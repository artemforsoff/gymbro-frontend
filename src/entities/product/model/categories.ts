import { Nullable } from '@/shared/types/utility-types';
import { createEffect, createStore } from 'effector';
import { api } from '@/shared/lib';
import { type ProductCategory } from '@/shared/types/entities';

export const $productCategories = createStore<Nullable<ProductCategory[]>>(null);

export const $productCategoriesById = $productCategories.map((categories) =>
  (categories || []).reduce<Record<ProductCategory['id'], ProductCategory>>(
    (acc, category) => ({ ...acc, [category.id]: category }),
    {},
  ),
);

export const getProductCategoriesFx = createEffect(() => {
  return api.get('product/categories').json<ProductCategory[]>();
});

$productCategories.on(getProductCategoriesFx.doneData, (_, categories) => categories);
