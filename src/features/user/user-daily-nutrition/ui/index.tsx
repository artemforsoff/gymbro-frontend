import { type FC } from 'react';
import styles from './styles.module.scss';
import { Nutrition } from './nutrition';
import { type Nutrients } from '@/shared/types/entities';

type UserDailyNutritionProps = {
  currentNutrients: Nutrients;
  targetNutrients: Nutrients;
};

export const UserDailyNutrition: FC<UserDailyNutritionProps> = ({
  currentNutrients,
  targetNutrients,
}) => {
  const nutrients: Array<{ label: string; current: number; target: number }> = [
    {
      label: 'Калории',
      current: currentNutrients.kcal,
      target: targetNutrients.kcal,
    },
    {
      label: 'Белки',
      current: currentNutrients.protein,
      target: targetNutrients.protein,
    },
    {
      label: 'Жиры',
      current: currentNutrients.fat,
      target: targetNutrients.fat,
    },
    {
      label: 'Углеводы',
      current: currentNutrients.carbs,
      target: targetNutrients.carbs,
    },
  ];

  return (
    <ul className={styles['user-daily-nutrition']}>
      {nutrients.map(({ label, current, target }) => (
        <Nutrition current={current} total={target} label={label} />
      ))}
    </ul>
  );
};
