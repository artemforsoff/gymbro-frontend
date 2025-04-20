import { type FC } from 'react';
import { useUnit } from 'effector-react';
import { userModel } from '@/entities/user/model';
import styles from './styles.module.scss';
import { Nutrition } from './nutrition';

const currentNutrition = {
  calories: 1600,
  carbs: 100,
  fats: 85,
  protein: 120,
};

export const UserDailyNutrition: FC = () => {
  const { calories, carbs, fats, protein } = useUnit(userModel.stores.$dailyNutrition) ?? {};

  const nutritions: Array<{ label: string; current: number; total: number }> = [
    {
      label: 'Калории',
      total: calories ?? 0,
      current: currentNutrition.calories,
    },
    {
      label: 'Белки',
      total: protein ?? 0,
      current: currentNutrition.protein,
    },
    {
      label: 'Жиры',
      total: fats ?? 0,
      current: currentNutrition.fats,
    },
    {
      label: 'Углеводы',
      total: carbs ?? 0,
      current: currentNutrition.carbs,
    },
  ];

  return (
    <ul className={styles['user-daily-nutrition']}>
      {nutritions.map(({ label, current, total }) => (
        <Nutrition current={current} total={total} label={label} />
      ))}
    </ul>
  );
};
