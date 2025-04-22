import { type FC } from 'react';
import styles from './styles.module.scss';
import { type Product } from '@/entities/product/model/types';
import { Ellipsis as EllipsisIcon } from 'lucide-react';
import { DropdownMenu, IconButton, Image } from '@/shared/ui/kit';
import clsx from 'clsx';
import { useConfirm } from '@/shared/ui/confirm';

type ProductCardProps = {
  product: Product;
  onDelete?: (product: Product) => void;
  onChange?: (product: Product) => void;
  className?: string;
  onSelect?: (product: Product) => void;
};

export const ProductCard: FC<ProductCardProps> = ({
  product,
  onChange,
  onDelete,
  className,
  onSelect,
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
        [styles['product-card--selectable']]: Boolean(onSelect),
      })}
      onClick={() => onSelect?.(product)}
    >
      <Image className={styles.image} src={''} />

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
