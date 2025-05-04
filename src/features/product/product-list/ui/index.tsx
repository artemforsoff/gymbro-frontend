import { useEffect, useMemo, useState, type ComponentProps, type FC } from 'react';
import { ProductCard } from '@/entities/product';
import styles from './styles.module.scss';
import { Button, CheckBox, Input, Placeholder } from '@/shared/ui/kit';
import { useDebounceValue } from 'usehooks-ts';
import { type Product } from '@/shared/types/entities';

type ProductCardProps = ComponentProps<typeof ProductCard>;

type ProductListProps = {
  products: Product[];
  onChangeProduct?: ProductCardProps['onChange'];
  onDeleteProduct?: ProductCardProps['onDelete'];
  onAddProduct?: () => void;
  selectable?: boolean;
  onSelectProducts?: (products: Product[]) => void;
};

export const ProductList: FC<ProductListProps> = ({
  products,
  selectable,
  onChangeProduct,
  onDeleteProduct,
  onAddProduct,
  onSelectProducts,
}) => {
  const [localProducts, setLocalProducts] = useState<Product[]>(products);
  const [searchValue, setSearchValue] = useState('');

  const [debouncedSearchValue] = useDebounceValue(searchValue, 500);

  const [selected, setSelected] = useState<Record<Product['id'], Product>>({});

  const handleSelect = (product: Product, checked: boolean) => {
    setSelected((prev) => {
      const updated = { ...prev };

      if (checked) {
        updated[product.id] = product;
      } else {
        delete updated[product.id];
      }

      return updated;
    });
  };

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

      <div className={styles.content}>
        {filteredProducts.map((product) => {
          const { id } = product;

          const Product = () => (
            <ProductCard
              key={id}
              product={product}
              onChange={onChangeProduct}
              onDelete={onDeleteProduct}
              selectable={selectable}
            />
          );

          if (selectable) {
            return (
              <CheckBox
                checked={Boolean(selected[id])}
                onChange={(e) => {
                  handleSelect(product, e.target.checked);
                }}
              >
                <Product />
              </CheckBox>
            );
          }
          return <Product />;
        })}
      </div>

      {selectable && (
        <footer>
          <Button
            className={styles.button}
            onClick={() => onSelectProducts?.(Object.values(selected))}
          >
            Выбрать
          </Button>
        </footer>
      )}
    </div>
  );
};
