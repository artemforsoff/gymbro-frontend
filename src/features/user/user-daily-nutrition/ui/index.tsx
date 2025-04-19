import { type FC } from 'react';
import { useUnit } from 'effector-react';
import { userModel } from '@/entities/user/model';
import styles from './styles.module.scss';

const currentNutrition = {
  calories: 1600,
  carbs: 100,
  fats: 85,
  protein: 120,
};

export const UserDailyNutrition: FC = () => {
  const { calories, carbs, fats, protein } = useUnit(userModel.stores.$dailyNutrition) ?? {};

  return (
    <div className={styles['user-daily-nutrition']}>
      <label>{/* <Caption className={styles['nutrition-caption']}>Калории</Caption> */}</label>

      <label>{/* <Caption className={styles['nutrition-caption']}>Белки</Caption> */}</label>

      <label>{/* <Caption className={styles['nutrition-caption']}>Жиры</Caption> */}</label>

      <label>{/* <Caption className={styles['nutrition-caption']}>Углеводы</Caption> */}</label>
    </div>
  );
};
