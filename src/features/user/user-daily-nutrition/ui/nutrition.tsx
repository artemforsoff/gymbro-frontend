import { type FC, type ReactNode } from 'react';
import styles from './styles.module.scss';
import { CircularProgress } from '@/shared/ui/kit';

type NutritionProps = {
  label: string;
  current: number;
  total: number;
  additional?: ReactNode;
};

export const Nutrition: FC<NutritionProps> = ({ label, current, total, additional = null }) => {
  return (
    <li className={styles.nutrition}>
      <figcaption className={styles.nutrition__label}>{label}</figcaption>

      <figure className={styles.nutrition__progress}>
        <span>{current}</span>
        <CircularProgress
          size={64}
          progress={total === 0 ? 0 : Math.min((current / total) * 100, 100)}
        />
      </figure>

      <div className={styles.nutrition__meta}>
        {additional}
        <span className={styles.nutrition__total}>{total}</span>
      </div>
    </li>
  );
};
