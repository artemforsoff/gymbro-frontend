import { useLocation, useNavigate } from 'react-router-dom';
import { hideBackButton, onBackButtonClick, showBackButton } from '@telegram-apps/sdk-react';
import { type PropsWithChildren, ReactNode, useEffect } from 'react';
import { PageProps, Route } from '@/pages/types';
import { Dumbbell, LayoutDashboard, Utensils } from 'lucide-react';
import styles from './styles.module.scss';
import { DatePicker, Input, Link } from '@/shared/ui/kit';
import { useUnit } from 'effector-react';
import { userModel } from '@/entities/user/model';
import { DateTime } from 'luxon';

type PageWrapperProps = PropsWithChildren<PageProps & Pick<Route, 'back' | 'main'>>;

export const PageWrapper = ({ children, back = false, main = false, routes }: PageWrapperProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (back) {
      showBackButton();
      return onBackButtonClick(() => {
        navigate(routes.dashboard.path);
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

  const activityDate = useUnit(userModel.stores.$activityDay);

  const changeActivityDate = (date: Date | null) => {
    if (!date) return;

    userModel.events.activityDayChanged(DateTime.fromJSDate(date).toFormat('yyyy-MM-dd'));
  };

  return (
    <main className={styles['page-wrapper']}>
      {main ? (
        <>
          <div className={styles['page-datepicker']}>
            <DatePicker value={activityDate} onChange={changeActivityDate} />
          </div>

          <div className={styles['page-inner']}>{children}</div>

          <nav className={styles.nav}>
            {tabs.map(({ text, Icon, link }, index) => (
              <Link
                className={styles['nav-link']}
                data-selected={pathname === link}
                key={index}
                to={link}
              >
                <div className={styles['nav-link__icon']}>{Icon}</div>
                <span className={styles['nav-link__text']}>{text}</span>
              </Link>
            ))}
          </nav>
        </>
      ) : (
        children
      )}
    </main>
  );
};
