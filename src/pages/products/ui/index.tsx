import { PageProps } from '@/pages/types';
import { ComponentProps, FC } from 'react';
import styles from './styles.module.scss';
import { CirclePlus as CirclePlusIcon } from 'lucide-react';
import { useModal } from '@/shared/ui/modal/use-modal';
import { useGate, useUnit } from 'effector-react';
import { ProductsPageGate } from '../model';
import { ProductList, productModel } from '@/entities/product';
import { CreateProductForm, UpdateProductForm } from '@/features/product';
import { IconButton } from '@/shared/ui/kit';

export const ProductsPage: FC<PageProps> = () => {
  useGate(ProductsPageGate);

  const { openModal, closeModal } = useModal();

  const products = useUnit(productModel.stores.$products);

  const addProduct = () => {
    openModal({
      content: <CreateProductForm onSuccess={closeModal} />,
      title: 'Добавить продукт',
    });
  };

  const deleteProduct: ComponentProps<typeof ProductList>['onDeleteProduct'] = (id) => {
    productModel.effects.deleteProductFx(id);
  };

  const changeProduct: ComponentProps<typeof ProductList>['onChangeProduct'] = (product) => {
    openModal({
      content: <UpdateProductForm onSuccess={closeModal} product={product} />,
      title: 'Обновить продукт',
    });
  };

  return (
    <div className={styles['products-page']}>
      <IconButton className={styles['add-button']} onClick={addProduct}>
        <CirclePlusIcon />
      </IconButton>

      <ProductList
        onAddProduct={addProduct}
        products={products || []}
        onChangeProduct={changeProduct}
        onDeleteProduct={deleteProduct}
      />
    </div>
  );
};
