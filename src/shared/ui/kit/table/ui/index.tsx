import clsx from 'clsx';
import {
  type HTMLAttributes,
  type DetailedHTMLProps,
  type FC,
  type TableHTMLAttributes,
} from 'react';
import styles from './styles.module.scss';

const TableComponent: FC<
  DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>
> = ({ className, children, ...props }) => {
  return (
    <table className={clsx(styles.table, className)} {...props}>
      {children}
    </table>
  );
};

const Tr: FC<DetailedHTMLProps<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>> = ({
  className,
  children,
  ...props
}) => (
  <tr className={clsx(styles.tr, className)} {...props}>
    {children}
  </tr>
);

const Td: FC<DetailedHTMLProps<HTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement>> = ({
  className,
  children,
  ...props
}) => (
  <td className={clsx(styles.td, className)} {...props}>
    {children}
  </td>
);

export const Table = Object.assign(TableComponent, {
  Tr,
  Td,
});
