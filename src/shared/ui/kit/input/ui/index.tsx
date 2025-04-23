import { forwardRef, ReactNode, type DetailedHTMLProps, type InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  label?: ReactNode;
  error?: string;
  postfix?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, id, error, postfix = null, ...props }, ref) => {
    return (
      <div className={styles['input-wrapper']}>
        {label && (
          <label htmlFor={id} className={styles['input-label']}>
            {label}
          </label>
        )}

        <div className={styles['input-wrapper']}>
          <input
            ref={ref}
            id={id}
            className={clsx(styles['input'], className, {
              [styles['input--error']]: Boolean(error),
              [styles['input--postfix']]: Boolean(postfix),
            })}
            data-error={error}
            {...props}
          />

          {postfix && <div className={styles['input-postfix']}>{postfix}</div>}
        </div>

        {error && <span className={styles['input-error']}>{error}</span>}
      </div>
    );
  },
);
