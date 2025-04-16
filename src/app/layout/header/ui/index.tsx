import { type FC } from 'react';
import styles from './styles.module.scss';
import { Avatar, IconButton } from '@telegram-apps/telegram-ui';
import { userModel } from '@/entities/user/model/index';
import { useUnit } from 'effector-react';
import { Menu as MenuIcon } from 'lucide-react';
import { useModal } from '@/shared/ui/modal/use-modal';
import { Menu } from './menu';
import { Routes } from '@/pages/types';

export const Header: FC<{ routes: Routes }> = ({ routes }) => {
  const user = useUnit(userModel.stores.$user);
  const { openModal, closeModal } = useModal();

  if (!user) return null;

  const acronym = user.firstName[0] + user.lastName[0];

  return (
    <header className={styles.header}>
      <Avatar acronym={acronym} size={28} />

      <IconButton
        mode="plain"
        size="s"
        onClick={() => {
          openModal({
            content: <Menu routes={routes} onClose={closeModal} />,
            title: 'Menu',
          });
        }}
      >
        <MenuIcon />
      </IconButton>
    </header>
  );
};
