import { ComponentProps } from 'react';
import { Button } from '../../button';
import styles from './styles.module.scss';
import clsx from 'clsx';

export const IconButton = ({
  children,
  className,
  ...props
}: Omit<ComponentProps<typeof Button>, 'mode'>) => (
  <Button type="button" mode="plain" className={clsx(styles['icon-button'], className)} {...props}>
    {children}
  </Button>
);
