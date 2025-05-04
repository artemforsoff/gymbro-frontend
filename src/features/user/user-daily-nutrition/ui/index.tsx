import { ReactNode, type FC } from 'react';
import styles from './styles.module.scss';
import { Nutrition } from './nutrition';
import { type Nutrients } from '@/shared/types/entities';
import { calcDailyNutrition } from '@/shared/lib';
import { ProteinTypes } from './protein-types';

type UserDailyNutritionProps = {
  currentNutrients?: Nutrients;
  targetNutrients?: ReturnType<typeof calcDailyNutrition>;
};

export const UserDailyNutrition: FC<UserDailyNutritionProps> = ({
  currentNutrients,
  targetNutrients,
}) => {
  const nutrients: Array<{
    label: string;
    current: number;
    target: number;
    additional?: ReactNode;
  }> = [
    {
      label: 'Калории',
      current: currentNutrients?.kcal ?? 0,
      target: targetNutrients?.kcal ?? 0,
    },
    {
      label: 'Белки',
      current: currentNutrients?.protein ?? 0,
      target: targetNutrients?.protein ?? 0,
      additional: (
        <ProteinTypes
          animalProtein={currentNutrients?.animalProtein ?? 0}
          plantProtein={currentNutrients?.plantProtein ?? 0}
          protein={currentNutrients?.protein ?? 0}
        />
      ),
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
      {nutrients.map(({ label, current, target, additional = null }) => (
        <Nutrition current={current} total={target} label={label} additional={additional} />
      ))}
    </ul>
  );
};
