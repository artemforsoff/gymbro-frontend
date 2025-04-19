import {
  forwardRef,
  ReactNode,
  type DetailedHTMLProps,
  type FC,
  type InputHTMLAttributes,
} from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  label?: ReactNode;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, id, error, ...props }, ref) => {
    return (
      <div className={styles['input-wrapper']}>
        {label && (
          <label htmlFor={id} className={styles['input-label']}>
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={id}
          className={clsx(styles['input'], className, {
            [styles['input--error']]: Boolean(error),
          })}
          data-error={error}
          {...props}
        />

        {error && <span className={styles['input-error']}>{error}</span>}
      </div>
    );
  },
);
