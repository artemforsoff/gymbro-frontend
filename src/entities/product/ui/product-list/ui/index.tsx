import { type ComponentProps, type FC } from 'react';
import { ProductCard } from '@/entities/product';
import { Product } from '@/entities/product/model/types';
import styles from './styles.module.scss';
import { Placeholder } from '@/shared/ui/kit';

type ProductCardProps = ComponentProps<typeof ProductCard>;

type ProductListProps = {
  products: Product[];
  onChangeProduct: ProductCardProps['onChange'];
  onDeleteProduct: ProductCardProps['onDelete'];
  onAddProduct: () => void;
};

export const ProductList: FC<ProductListProps> = ({
  products,
  onChangeProduct,
  onDeleteProduct,
  onAddProduct,
}) => {
  if (!products.length) {
    return (
      <Placeholder
        onClick={onAddProduct}
        title="Упс, ничего не нашлось"
        description="Попробуй добавить свой первый продукт прямо сейчас!"
        buttonText="Добавить продукт"
      />
    );
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
