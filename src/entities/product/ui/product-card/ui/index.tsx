import { useMemo, type FC } from 'react';
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
  amount?: number;
};

export const ProductCard: FC<ProductCardProps> = ({
  product,
  onChange,
  onDelete,
  className,
  onSelect,
  selectable,
  amount = 100,
}) => {
  const { name, imageUrl } = product;

  const { carbs, fat, fiber, kcal, protein } = useMemo(() => {
    const { kcal, protein, fat, carbs, fiber } = product;
    const factor = amount / 100;

    if (factor === 1) return { kcal, protein, fat, carbs, fiber };

    return {
      kcal: +kcal * factor,
      protein: +protein * factor,
      fat: +fat * factor,
      carbs: +carbs * factor,
      fiber: +fiber * factor,
    };
  }, [product, amount]);

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
      <Image className={styles.image} src={imageUrl ?? ''} />

      <div className={styles.info}>
        <h3 className={styles.name}>
          {name} <span>({amount} г)</span>
        </h3>

        <div className={styles.description}>
          <strong>{kcal} г </strong> ккал; <strong>{protein} г</strong> белков;{' '}
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
