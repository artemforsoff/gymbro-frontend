import { type FC } from 'react';
import styles from './styles.module.scss';
import { Ellipsis as EllipsisIcon } from 'lucide-react';
import { DropdownMenu, IconButton, Image } from '@/shared/ui/kit';
import clsx from 'clsx';
import { useConfirm } from '@/shared/ui/confirm';
import { type Product } from '@/shared/types/entities';

type ProductCardProps = {
  product: Product;
  onDelete?: (product: Product) => void;
  onChange?: (product: Product) => void;
  className?: string;
  onSelect?: (product: Product) => void;
  selectable?: boolean;
};

export const ProductCard: FC<ProductCardProps> = ({
  product,
  onChange,
  onDelete,
  className,
  onSelect,
  selectable,
}) => {
  const { name, kcal, carbs, protein, fat, fiber } = product;
  const isShowDropdown = Boolean(onChange || onDelete);

  const { confirm } = useConfirm();

  const handleDelete = () => {
    confirm({
      description: 'Вы уверены, что хотите удалить продукт?',
      onConfirm: () => onDelete?.(product),
    });
  };

  return (
    <article
      className={clsx(styles['product-card'], className, {
        [styles['product-card--selectable']]: selectable,
      })}
      onClick={() => onSelect?.(product)}
    >
      <Image className={styles.image} src={''} />

      <div className={styles.info}>
        <div className={styles.name}>{name}</div>

        <div className={styles.description}>
          на 100 г: <strong>{kcal} г </strong> ккал; <strong>{protein} г</strong> белков;{' '}
          <strong>{fat} г </strong> жиров; <strong>{carbs} г</strong> углеводов;{' '}
          <strong>{fiber} г</strong> клетчатки
        </div>
      </div>

      {isShowDropdown && (
        <div className={styles.menu}>
          <DropdownMenu
            placement="bottom-end"
            trigger={
              <IconButton>
                <EllipsisIcon />
              </IconButton>
            }
          >
            {onChange && (
              <DropdownMenu.Item onClick={() => onChange(product)}>Редактировать</DropdownMenu.Item>
            )}
            {onDelete && (
              <DropdownMenu.Item
                onClick={handleDelete}
                style={{ color: 'var(--tg-theme-destructive-text-color)' }}
              >
                Удалить
              </DropdownMenu.Item>
            )}
          </DropdownMenu>
        </div>
      )}
    </article>
  );
};
