import { useMemo, type FC } from 'react';
import { type Routes } from '@/pages/types';
import { Button } from '@/shared/ui/kit';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { getMenuItems } from '../config';

export const Menu: FC<{ routes: Routes; onClickMenuItem: () => void }> = ({
  routes,
  onClickMenuItem,
}) => {
  const navigate = useNavigate();

  const menuItems = useMemo(() => getMenuItems(routes), [routes]);

  const handleClick = (path: string) => {
    navigate(path);
    onClickMenuItem();
  };

  return (
    <nav className={styles.menu}>
      {menuItems.map(({ text, Icon, path }) => (
        <Button mode="plain" className={styles['menu-item']} onClick={() => handleClick(path)}>
          <Icon />
          <span>{text}</span>
        </Button>
      ))}
    </nav>
  );
};
