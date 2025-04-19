import clsx from 'clsx';
import { DetailedHTMLProps, FC, ReactNode, SelectHTMLAttributes } from 'react';
import styles from './styles.module.scss';

type SelectProps = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & {
  label?: ReactNode;
  error?: string;
};

export const Select: FC<SelectProps> = ({ children, className, label, id, error, ...props }) => {
  return (
    <div className={styles['select-wrapper']}>
      {label && (
        <label htmlFor={id} className={styles['select-label']}>
          {label}
        </label>
      )}

      <select
        className={clsx(styles['select'], className, {
          [styles['select--error']]: Boolean(error),
        })}
        {...props}
      >
        {children}
      </select>

      {error && <span className={styles['select-error']}>{error}</span>}
    </div>
  );
};
