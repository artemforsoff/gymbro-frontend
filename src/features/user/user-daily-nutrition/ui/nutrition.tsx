import { FC } from 'react';
import styles from './styles.module.scss';
import { CircularProgress } from '@/shared/ui/kit';

type NutritionProps = {
  label: string;
  current: number;
  total: number;
};

export const Nutrition: FC<NutritionProps> = ({ label, current, total }) => {
  return (
    <li className={styles.nutrition}>
      <label className={styles.nutrition__label}>{label}</label>

      <div className={styles.nutrition__progress}>
        <span>{current}</span>
        <CircularProgress
          size={64}
          progress={total === 0 ? 0 : Math.min((current / total) * 100, 100)}
        />
      </div>

      <p className={styles.nutrition__target}>{total}</p>
    </li>
  );
};
