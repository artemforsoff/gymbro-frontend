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
      <CircularProgress
        className={styles.nutrition__progress}
        progress={total === 0 ? 0 : Math.min((current / total) * 100, 100)}
      />

      <label className={styles.nutrition__label}>{label}</label>

      <p className={styles.nutrition__result}>
        <strong>{current}</strong>/{total}
      </p>
    </li>
  );
};
