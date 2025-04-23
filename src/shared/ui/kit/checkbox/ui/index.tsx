import { type FC, type DetailedHTMLProps, type InputHTMLAttributes, ReactNode } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';

type CheckBoxProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  wrapperClassName?: string;
  children?: ReactNode;
};

export const CheckBox: FC<CheckBoxProps> = ({ wrapperClassName, children, disabled, ...props }) => {
  return (
    <label className={clsx(styles.checkbox, wrapperClassName, disabled && styles.disabled)}>
      <input type="checkbox" className={styles.input} disabled={disabled} {...props} />
      <span className={styles.box}>
        <svg viewBox="0 0 24 24" className={styles.icon}>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
      {children && <span className={styles.label}>{children}</span>}
    </label>
  );
};
