import { type FC } from 'react';
import { type Routes } from '@/pages/types';
import { Beef as BeefIcon, ContactRound as ContactRoundIcon } from 'lucide-react';
import { Button } from '@/shared/ui/kit';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';

export const Menu: FC<{ routes: Routes; onClose: () => void }> = ({ routes, onClose }) => {
  const navigate = useNavigate();

  const menuItems: Array<{ text: string; path: string; Icon: FC }> = [
    {
      text: 'Профиль',
      path: routes.profile.path,
      Icon: ContactRoundIcon,
    },
    {
      text: 'Продукты',
      path: routes.products.path,
      Icon: BeefIcon,
    },
  ];

  const handleClick = (path: string) => {
    navigate(path);
    onClose();
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
