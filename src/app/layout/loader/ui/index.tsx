import { type FC } from 'react';
import styles from './styles.module.scss';
import { LoaderCircleIcon } from 'lucide-react';

export const Loader: FC = () => {
  return (
    <div className={styles.loader}>
      <LoaderCircleIcon className={styles.loader__icon} />
    </div>
  );
};
