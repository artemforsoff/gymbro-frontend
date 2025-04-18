import { type ComponentProps, type FC } from 'react';
import { Placeholder } from '@telegram-apps/telegram-ui';
import { ProductCard } from '@/entities/products';
import { Product } from '@/entities/products/model/types';
import styles from './styles.module.scss';

type ProductCardProps = ComponentProps<typeof ProductCard>;

type ProductListProps = {
  products: Product[];
  onChangeProduct: ProductCardProps['onChange'];
  onDeleteProduct: ProductCardProps['onDelete'];
};

export const ProductList: FC<ProductListProps> = ({
  products,
  onChangeProduct,
  onDeleteProduct,
}) => {
  if (!products.length) {
    return <Placeholder header="Упс" description="Не нашлось ни одного продукта" />;
  }
  return (
    <ul className={styles['product-list']}>
      {products.map((product) => {
        const { id } = product;

        return (
          <ProductCard
            key={id}
            product={product}
            onChange={onChangeProduct}
            onDelete={onDeleteProduct}
          />
        );
      })}
    </ul>
  );
};
