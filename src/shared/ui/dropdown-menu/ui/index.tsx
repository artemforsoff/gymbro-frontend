import styles from './styles.module.scss';
import { useFloating, offset, flip, shift, autoUpdate, type Placement } from '@floating-ui/react';
import { Button, type ButtonProps } from '@telegram-apps/telegram-ui';
import clsx from 'clsx';
import { type PropsWithChildren, type ReactNode, useEffect, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

type DropdownMenuProps = PropsWithChildren<{
  trigger: ReactNode;
  placement?: Placement;
}>;

export const DropdownMenu = ({ children, trigger, placement = 'bottom' }: DropdownMenuProps) => {
  const [open, setOpen] = useState(false);
  const { refs, floatingStyles, update } = useFloating<HTMLDivElement>({
    placement,
    middleware: [offset(4), flip(), shift()],
  });

  useOnClickOutside(refs.floating, () => setOpen(false));

  useEffect(() => {
    if (!open) return;

    const reference = refs.reference.current;
    const floating = refs.floating.current;

    if (reference && floating) {
      return autoUpdate(reference, floating, update);
    }
  }, [open, refs.reference, refs.floating, update]);

  return (
    <>
      <div ref={refs.setReference} onClick={() => setOpen((prev) => !prev)}>
        {trigger}
      </div>

      {open && (
        <div
          className={styles['dropdown-menu']}
          ref={refs.setFloating}
          style={floatingStyles}
          onClick={() => setOpen(false)}
        >
          {children}
        </div>
      )}
    </>
  );
};

DropdownMenu.Item = ({ children, className, onClick: propsOnClick, ...props }: ButtonProps) => (
  <Button
    className={clsx(styles['dropdown-menu__item'], className)}
    mode="plain"
    onClick={(e) => {
      propsOnClick?.(e);
    }}
    {...props}
  >
    {children}
  </Button>
);
