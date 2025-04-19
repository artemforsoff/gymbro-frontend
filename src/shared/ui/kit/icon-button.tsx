import { ComponentProps } from 'react';
import { Button } from './button';

export const IconButton = ({
  children,
  style,
  ...props
}: Omit<ComponentProps<typeof Button>, 'mode'>) => (
  <Button mode="plain" style={{ borderRadius: '50%', padding: 8, ...style }} {...props}>
    {children}
  </Button>
);
