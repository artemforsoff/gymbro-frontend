import { type FC } from 'react';
import styles from './styles.module.scss';
import { type Product } from '@/entities/product/model/types';
import { Ellipsis as EllipsisIcon } from 'lucide-react';
import { Button, DropdownMenu, IconButton } from '@/shared/ui/kit';
import clsx from 'clsx';

type ProductCardProps = {
  product: Product;
  onDelete?: (productId: Product['id']) => void;
  onChange?: (product: Product) => void;
  className?: string;
};

export const ProductCard: FC<ProductCardProps> = ({ product, onChange, onDelete, className }) => {
  const { name, kcal, carbs, protein, fat, id, fiber } = product;
  const isShowDropdown = Boolean(onChange || onDelete);

  return (
    <div className={clsx(styles['product-card'], className)}>
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.subtitle}>
          100 г · <strong>{kcal}</strong> ккал
        </div>
        <div className={styles.description}>
          БЖУ: <strong>{protein}</strong> г / <strong>{fat}</strong> г / <strong>{carbs}</strong> г
          <br />
          Клетчатка: <strong>{fiber}</strong> г
        </div>
      </div>

      {isShowDropdown && (
        <div className={styles.menu}>
          <DropdownMenu
            placement="bottom-end"
            trigger={
              <IconButton className="plain-button">
                <EllipsisIcon />
              </IconButton>
            }
          >
            {onChange && (
              <DropdownMenu.Item onClick={() => onChange(product)}>Редактировать</DropdownMenu.Item>
            )}
            {onDelete && (
              <DropdownMenu.Item
                onClick={() => onDelete(id)}
                style={{ color: 'var(--tg-theme-destructive-text-color)' }}
              >
                Удалить
              </DropdownMenu.Item>
            )}
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};
