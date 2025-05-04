import { type FC } from 'react';
import { EllipsisIcon } from 'lucide-react';
import { DropdownMenu, IconButton, Image } from '@/shared/ui/kit';
import styles from './styles.module.scss';
import { useConfirm } from '@/shared/ui/confirm';
import { calcProductsNutrition } from '@/shared/lib';
import { type Recipe } from '@/shared/types/entities';
import clsx from 'clsx';

type RecipeCardProps = {
  recipe: Recipe;
  onDelete?: (recipe: Recipe) => void;
  onChange?: (recipe: Recipe) => void;
  selectable?: boolean;
  portions?: number | string;
};

export const RecipeCard: FC<RecipeCardProps> = ({
  recipe,
  onChange,
  onDelete,
  selectable,
  portions = 1,
}) => {
  const { name } = recipe;
  const isShowDropdown = Boolean(onChange || onDelete);
  const { kcal, carbs, fat, fiber, protein } = calcProductsNutrition(recipe.products);

  const { confirm } = useConfirm();

  const handleDelete = () => {
    confirm({
      description: 'Вы уверены, что хотите удалить рецепт?',
      onConfirm: () => onDelete?.(recipe),
    });
  };

  return (
    <article
      className={clsx(styles['recipe-card'], { [styles['recipe-card--selectable']]: selectable })}
    >
      <Image className={styles.image} src="" />

      <div className={styles.info}>
        <h3 className={styles.name}>
          {name} {portions !== 1 && <span>(x{portions})</span>}
        </h3>
        <p className={styles.description}>
          <strong>{kcal} г </strong> ккал; <strong>{protein} г</strong> белков;{' '}
          <strong>{fat} г </strong> жиров; <strong>{carbs} г</strong> углеводов;{' '}
          <strong>{fiber} г</strong> клетчатки
        </p>
      </div>

      {isShowDropdown && (
        <DropdownMenu
          placement="bottom-end"
          trigger={
            <IconButton>
              <EllipsisIcon />
            </IconButton>
          }
        >
          {onChange && (
            <DropdownMenu.Item onClick={() => onChange(recipe)}>Редактировать</DropdownMenu.Item>
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
      )}
    </article>
  );
};
