import { type FC } from 'react';
import styles from './styles.module.scss';
import { Button } from '@/shared/ui/kit';

type ConfirmProps = {
  onConfirm: () => void;
  onCancel?: () => void;
  description?: string;
};

export const Confirm: FC<ConfirmProps> = ({ description, onCancel, onConfirm }) => {
  return (
    <div className={styles.confirm}>
      {description && <p className={styles.confirm__description}>{description}</p>}

      <nav className={styles.confirm__buttons}>
        <Button mode="plain" className={styles.confirm__cancel} onClick={onCancel}>
          Отмена
        </Button>
        <Button className={styles.confirm__confirm} onClick={onConfirm}>
          Подтвердить
        </Button>
      </nav>
    </div>
  );
};
