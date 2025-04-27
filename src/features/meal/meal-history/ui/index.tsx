import { type FC } from 'react';
import { type Meal } from '@/shared/types/entities';
import styles from './styles.module.scss';
import { DateTime } from 'luxon';
import { ProductCard } from '@/entities/product';
import { RecipeCard } from '@/entities/recipe';
import { IconButton, Placeholder, Table } from '@/shared/ui/kit';
import { calcMealNutrition } from '@/shared/lib';
import { Trash2Icon } from 'lucide-react';
import { useConfirm } from '@/shared/ui/confirm';
import { deleteMealFx } from '../model';

type MealHistoryProps = {
  meals: Meal[];
  onSuccessDelete?: () => void;
  onAddMeal?: () => void;
};

export const MealHistory: FC<MealHistoryProps> = ({ meals, onSuccessDelete, onAddMeal }) => {
  const { confirm } = useConfirm();

  const deleteMeal = (id: Meal['id']) => {
    confirm({
      description: 'Вы уверены, что хотите удалить прием пищи?',
      onConfirm: () => deleteMealFx(id).then(() => onSuccessDelete?.()),
    });
  };

  if (!meals.length) {
    return (
      <Placeholder
        title="Упс, ничего не нашлось"
        description="Видимо ты ещё сегодня не ел"
        buttonText="Добавить приём"
        onClick={onAddMeal}
      />
    );
  }
  return (
    <div className={styles['meal-history']}>
      <div className={styles.timeline} />

      <ul className={styles.meals}>
        {meals.map((meal) => {
          const mealNutrition = calcMealNutrition(meal);

          return (
            <li className={styles.meal} key={meal.id}>
              <header className={styles.meal__header}>
                <h3 className={styles.meal__name}>{meal.name}</h3>

                <time className={styles.meal__time}>
                  {DateTime.fromISO(meal.datetime).toFormat('HH:mm')}
                </time>
              </header>

              <Table>
                <Table.Tr>
                  <Table.Td>Калории</Table.Td>
                  <Table.Td>Белки</Table.Td>
                  <Table.Td>Жиры</Table.Td>
                  <Table.Td>Углеводы</Table.Td>
                </Table.Tr>

                <Table.Tr>
                  <Table.Td>{mealNutrition.kcal}</Table.Td>
                  <Table.Td>{mealNutrition.protein}</Table.Td>
                  <Table.Td>{mealNutrition.fat}</Table.Td>
                  <Table.Td>{mealNutrition.carbs}</Table.Td>
                </Table.Tr>
              </Table>

              <ul className={styles.meal__positions}>
                {meal.products.map(({ product, amount }) => (
                  <ProductCard product={product} key={product.id} amount={Number(amount)} />
                ))}

                {meal.recipes.map(({ recipe, products, portions }) => (
                  <RecipeCard recipe={{ ...recipe, products }} portions={portions} />
                ))}
              </ul>

              <IconButton className={styles.meal__delete} onClick={() => deleteMeal(meal.id)}>
                <Trash2Icon />
              </IconButton>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
