import { FC } from 'react';
import styles from './styles.module.scss';
import { Button } from '@/shared/ui/kit';

type PlaceholderProps = {
  onClick?: () => void;
  title: string;
  description: string;
  buttonText?: string;
};

export const Placeholder: FC<PlaceholderProps> = ({ title, description, buttonText, onClick }) => (
  <div className={styles.placeholder}>
    <h1 className={styles.placeholder__title}>{title}</h1>

    <p className={styles.placeholder__description}>{description}</p>

    {buttonText && (
      <Button className={styles.placeholder__button} onClick={onClick}>
        {buttonText}
      </Button>
    )}
  </div>
);
