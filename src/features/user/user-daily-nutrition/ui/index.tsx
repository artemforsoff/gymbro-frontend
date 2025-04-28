import { type FC } from 'react';
import styles from './styles.module.scss';
import { Nutrition } from './nutrition';
import { type Nutrients } from '@/shared/types/entities';

type UserDailyNutritionProps = {
  currentNutrients?: Nutrients;
  targetNutrients?: Nutrients;
};

export const UserDailyNutrition: FC<UserDailyNutritionProps> = ({
  currentNutrients,
  targetNutrients,
}) => {
  const nutrients: Array<{ label: string; current: number; target: number }> = [
    {
      label: 'Калории',
      current: currentNutrients?.kcal ?? 0,
      target: targetNutrients?.kcal ?? 0,
    },
    {
      label: 'Белки',
      current: currentNutrients?.protein ?? 0,
      target: targetNutrients?.protein ?? 0,
    },
    {
      label: 'Жиры',
      current: currentNutrients?.fat ?? 0,
      target: targetNutrients?.fat ?? 0,
    },
    {
      label: 'Углеводы',
      current: currentNutrients?.carbs ?? 0,
      target: targetNutrients?.carbs ?? 0,
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
