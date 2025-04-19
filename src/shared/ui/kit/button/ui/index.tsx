import clsx from 'clsx';
import {
  type ReactNode,
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
  type FC,
  useRef,
} from 'react';
import styles from './styles.module.scss';
import { LoaderCircleIcon } from 'lucide-react';

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  mode?: 'accent' | 'plain';
  icon?: ReactNode;
  loading?: boolean;
};

export const Button: FC<ButtonProps> = ({
  children,
  className,
  mode = 'accent',
  icon = null,
  loading = false,
  onClick: propsOnClick,
  ...props
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = btnRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.className = styles.ripple;
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  return (
    <button
      ref={btnRef}
      className={clsx(styles.button, className, {
        [styles['button--with-icon']]: Boolean(icon),
      })}
      data-mode={mode}
      onClick={(e) => {
        createRipple(e);
        propsOnClick?.(e);
      }}
      {...props}
    >
      {children}

      {Boolean(icon || loading) && (
        <div className={styles['button-icon']} data-loading={loading}>
          {loading ? <LoaderCircleIcon /> : icon}
        </div>
      )}
    </button>
  );
};
