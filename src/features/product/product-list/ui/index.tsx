import { useEffect, useMemo, useState, type ComponentProps, type FC } from 'react';
import { ProductCard } from '@/entities/product';
import { Product } from '@/entities/product/model/types';
import styles from './styles.module.scss';
import { Input, Placeholder } from '@/shared/ui/kit';
import { useDebounceValue } from 'usehooks-ts';

type ProductCardProps = ComponentProps<typeof ProductCard>;

type ProductListProps = {
  products: Product[];
  onChangeProduct?: ProductCardProps['onChange'];
  onDeleteProduct?: ProductCardProps['onDelete'];
  onAddProduct?: () => void;
  selectable?: boolean;
  onSelectProduct?: (product: Product) => void;
};

export const ProductList: FC<ProductListProps> = ({
  products,
  selectable,
  onChangeProduct,
  onDeleteProduct,
  onAddProduct,
  onSelectProduct,
}) => {
  const [localProducts, setLocalProducts] = useState<Product[]>(products);
  const [searchValue, setSearchValue] = useState('');

  const [debouncedSearchValue] = useDebounceValue(searchValue, 500);

  useEffect(() => {
    setLocalProducts(products);
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectable) {
      return localProducts.filter(({ name }) =>
        name.toLowerCase().includes(debouncedSearchValue.toLowerCase()),
      );
    }
    return localProducts;
  }, [localProducts, debouncedSearchValue, selectable]);

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
    <div className={styles['product-list']}>
      {selectable && (
        <Input
          className={styles.search}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Поиск"
        />
      )}

      {filteredProducts.map((product) => {
        const { id } = product;

        return (
          <ProductCard
            onSelect={onSelectProduct}
            key={id}
            product={product}
            onChange={onChangeProduct}
            onDelete={onDeleteProduct}
          />
        );
      })}
    </div>
  );
};
