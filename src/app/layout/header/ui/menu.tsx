import { type FC } from 'react';
import { Cell, Divider, Text } from '@telegram-apps/telegram-ui';
import { type Routes } from '@/pages/types';
import { ContactRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Menu: FC<{ routes: Routes; onClose: () => void }> = ({ routes, onClose }) => {
  const navigate = useNavigate();

  const menuItems: Array<{ text: string; path: string; Icon: FC }> = [
    {
      text: 'Профиль',
      path: routes.profile.path,
      Icon: ContactRound,
    },
  ];

  const handleClick = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <nav>
      {menuItems.map(({ text, Icon, path }, index, { length }) => (
        <>
          <Cell before={<Icon />} onClick={() => handleClick(path)}>
            <Text weight="2">{text}</Text>
          </Cell>

          {index < length - 1 && <Divider />}
        </>
      ))}
    </nav>
  );
};
