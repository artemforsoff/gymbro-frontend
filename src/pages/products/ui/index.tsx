import { PageProps } from '@/pages/types';
import { IconButton, Section } from '@telegram-apps/telegram-ui';
import { FC } from 'react';
import styles from './styles.module.scss';
import { CirclePlus as CirclePlusIcon } from 'lucide-react';
import { useModal } from '@/shared/ui/modal/use-modal';
import { ProductForm } from '@/features/product';
import { useGate, useUnit } from 'effector-react';
import { ProductsPageGate } from '../model';
import { productModel } from '@/entities/products/model';

export const ProductsPage: FC<PageProps> = () => {
  useGate(ProductsPageGate);

  const { openModal } = useModal();

  const products = useUnit(productModel.stores.$products);

  const addProduct = () => {
    openModal({ content: <ProductForm mode="create" />, title: 'Добавить продукт' });
  };

  return (
    <Section className={styles['products-page']} header="Мои продукты">
      <IconButton className={styles['add-button']} onClick={addProduct}>
        <CirclePlusIcon />
      </IconButton>

      {JSON.stringify(products, null, 2)}
    </Section>
  );
};
