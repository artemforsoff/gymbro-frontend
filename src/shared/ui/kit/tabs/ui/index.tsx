import { FC } from 'react';
import styles from './style.module.scss';
import clsx from 'clsx';
import { Button } from '../../button';

type TabsListProps = {
  items: Array<{
    key: string;
    text: string;
  }>;
  selectedKey: string;
  onSelect: (key: string) => void;
};

export const TabsList: FC<TabsListProps> = ({ items, selectedKey, onSelect }) => {
  return (
    <nav className={styles.tabs}>
      {items.map(({ key, text }) => (
        <Button
          mode="plain"
          key={key}
          className={clsx(styles.tab, {
            [styles.selected]: key === selectedKey,
          })}
          onClick={() => {
            onSelect(key);
          }}
        >
          {text}
        </Button>
      ))}
    </nav>
  );
};
