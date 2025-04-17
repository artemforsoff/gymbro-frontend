import { type FC } from 'react';
import styles from './styles.module.scss';
import { type Product } from '@/entities/products/model/types';
import { Cell, IconButton } from '@telegram-apps/telegram-ui';
import { Ellipsis as EllipsisIcon } from 'lucide-react';
import { DropdownMenu } from '@/shared/ui';
import clsx from 'clsx';

type ProductCardProps = {
  product: Product;
  onDelete?: (productId: Product['id']) => void;
  onChange?: (product: Product) => void;
  className?: string;
};

export const ProductCard: FC<ProductCardProps> = ({ product, onChange, onDelete, className }) => {
  const { name, kcal, carbs, protein, fat, id } = product;
  const isShowDropdown = Boolean(onChange || onDelete);

  return (
    <Cell
      className={clsx(styles['product-card'], className)}
      after={
        isShowDropdown && (
          <DropdownMenu
            placement="bottom-end"
            trigger={
              <IconButton mode="plain">
                <EllipsisIcon />
              </IconButton>
            }
          >
            {onChange && (
              <DropdownMenu.Item onClick={() => onChange?.(product)}>
                Редактировать
              </DropdownMenu.Item>
            )}
            {onDelete && (
              <DropdownMenu.Item
                onClick={() => onDelete?.(id)}
                style={{ color: 'var(--tg-theme-destructive-text-color)' }}
              >
                Удалить
              </DropdownMenu.Item>
            )}
          </DropdownMenu>
        )
      }
      description={
        <>
          Б - <strong>{protein}</strong> г; Ж - <strong>{fat}</strong> г; У:{' '}
          <strong>{carbs}</strong> г
        </>
      }
      subtitle={
        <>
          100 г · <strong>{kcal}</strong> ккал
        </>
      }
    >
      <strong className={styles.name}>{name}</strong>
    </Cell>
  );
};
