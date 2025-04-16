import { useLocation, useNavigate } from 'react-router-dom';
import { hideBackButton, onBackButtonClick, showBackButton } from '@telegram-apps/sdk-react';
import { type PropsWithChildren, ReactNode, useEffect } from 'react';
import { Tabbar } from '@telegram-apps/telegram-ui';
import { PageProps, Route } from '@/pages/types';
import { Dumbbell, LayoutDashboard, Utensils } from 'lucide-react';

export type PageWrapperProps = PropsWithChildren<PageProps & Pick<Route, 'back' | 'navigation'>>;

export const PageWrapper = ({
  children,
  back = false,
  navigation = false,
  routes,
}: PageWrapperProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (back) {
      showBackButton();
      return onBackButtonClick(() => {
        navigate(-1);
      });
    }
    hideBackButton();
  }, [back]);

  const tabs: Array<{ text: string; Icon: ReactNode; link: string }> = [
    {
      text: 'Тренировка',
      Icon: <Dumbbell />,
      link: routes.workout.path,
    },
    {
      text: 'Главная',
      Icon: <LayoutDashboard />,
      link: routes.dashboard.path,
    },
    {
      text: 'Питание',
      Icon: <Utensils />,
      link: routes.nutrition.path,
    },
  ];

  return (
    <>
      {navigation && (
        <Tabbar>
          {tabs.map(({ text, Icon, link }, index) => (
            <Tabbar.Item
              key={index}
              text={text}
              selected={pathname === link}
              onClick={() => navigate(link)}
            >
              {Icon}
            </Tabbar.Item>
          ))}
        </Tabbar>
      )}

      {children}
    </>
  );
};
