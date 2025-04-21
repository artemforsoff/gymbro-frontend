import { BeefIcon, ContactRoundIcon, ReceiptTextIcon } from 'lucide-react';
import { type Routes } from '@/pages/types';
import { type FC } from 'react';

export const getMenuItems = (routes: Routes): Array<{ text: string; path: string; Icon: FC }> => {
  return [
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
    {
      text: 'Рецепты',
      path: routes.recipes.path,
      Icon: ReceiptTextIcon,
    },
  ];
};
