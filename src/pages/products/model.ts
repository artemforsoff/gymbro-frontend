import { productModel } from '@/entities/products';
import { sample } from 'effector';
import { createGate } from 'effector-react';

export const ProductsPageGate = createGate();

sample({
  clock: ProductsPageGate.open,
  target: [productModel.effects.getProductCategoriesFx, productModel.effects.getProductsFx],
});
