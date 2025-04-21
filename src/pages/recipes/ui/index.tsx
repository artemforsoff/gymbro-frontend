import { type FC } from 'react';
import { CirclePlusIcon } from 'lucide-react';
import { type PageProps } from '@/pages/types';
import { IconButton } from '@/shared/ui/kit';
import styles from './styles.module.scss';
import { useGate, useUnit } from 'effector-react';
import { RecipesPageGate } from '../model';
import { useModal } from '@/shared/ui/modal';
import { CreateRecipeForm } from '@/features/recipe';
import { ProductList, productModel } from '@/entities/product';
import { type Product } from '@/entities/product/model/types';

export const RecipesPage: FC<PageProps> = () => {
  useGate(RecipesPageGate);

  const { openModal, closeModal } = useModal();

  const products = useUnit(productModel.stores.$products);

  const selectProduct = (): Promise<Product> => {
    return new Promise((resolve) => {
      openModal({
        content: (
          <ProductList
            products={products || []}
            selectable
            onSelectProduct={(product) => {
              resolve(product);
              closeModal();
            }}
          />
        ),
        title: 'Выбрать продукт',
      });
    });
  };

  const createRecipe = () => {
    openModal({
      content: <CreateRecipeForm onAddProduct={selectProduct} onSuccess={closeModal} />,
      title: 'Добавить рецепт',
    });
  };

  return (
    <div className={styles['recipes-page']}>
      <IconButton className={styles['add-button']} onClick={createRecipe}>
        <CirclePlusIcon />
      </IconButton>
    </div>
  );
};
