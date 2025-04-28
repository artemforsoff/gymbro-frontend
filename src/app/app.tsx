import { useEffect, useMemo } from 'react';
import { sample } from 'effector';
import { createGate, useGate, useUnit } from 'effector-react';
import { Navigate, Route, Routes, HashRouter } from 'react-router-dom';
import Modal from 'react-modal';
import { ToastContainer } from 'react-toastify';
import { isMiniAppDark, retrieveLaunchParams, useSignal } from '@telegram-apps/sdk-react';
import Color from 'color';
import { Header } from './layout/header';
import { PageWrapper } from './layout/page-wrapper';
import { routes } from '@/pages/routes';
import { userModel } from '@/entities/user/model/index';
import { ModalProvider } from '@/shared/ui';
import { Loader as AppLoader } from './layout/loader';

Modal.setAppElement('#root');

window.addEventListener('scroll', () => {
  if (window.scrollY > 0) window.scrollTo(0, 0);
});

const AppGate = createGate();

sample({
  clock: AppGate.open,
  target: userModel.effects.getMeFx,
});

export function App() {
  useGate(AppGate);

  const isUserLoading = useUnit(userModel.effects.getMeFx.pending);

  const isDark = useSignal(isMiniAppDark);

  const lp = useMemo(() => retrieveLaunchParams(), []);

  useEffect(() => {
    const {
      tgWebAppThemeParams: {
        accent_text_color: accentTextColor,
        bg_color: bgColor,
        text_color: textColor,
        secondary_bg_color: secondaryBgColor,
        hint_color: hintColor,
        destructive_text_color: destructiveTextColor,
      },
    } = lp;
    const body = document.body;

    if (accentTextColor) {
      const color = Color(accentTextColor);

      body.style.setProperty('--gb-accent-color', accentTextColor);
      body.style.setProperty('--gb-accent-color--rgb', color.rgb().array().join(','));
      body.style.setProperty('--gb-accent-color--light', color.lighten(0.1).hex());
      body.style.setProperty('--gb-accent-color--dark', color.darken(0.1).hex());
    }
    if (bgColor) body.style.setProperty('--gb-bg-color', bgColor);
    if (textColor) body.style.setProperty('--gb-text-color', textColor);
    if (secondaryBgColor) body.style.setProperty('--gb-secondary-bg-color', secondaryBgColor);
    if (hintColor) {
      const color = Color(hintColor);
      body.style.setProperty('--gb-hint-color', hintColor);
      body.style.setProperty('--gb-hint-color--rgb', color.rgb().array().join(','));
    }
    if (destructiveTextColor) body.style.setProperty('--gb-danger-color', destructiveTextColor);

    document.body.dataset.theme = isDark ? 'gb-dark' : 'gb-light';
  }, [lp, isDark]);

  if (isUserLoading) {
    return <AppLoader />;
  }
  return (
    <HashRouter>
      <ToastContainer toastClassName="gb-toast" />

      <ModalProvider />

      <Header routes={routes} />

      <Routes>
        {Object.values(routes).map(({ Component, path, back, main }) => (
          <Route
            key={path}
            path={path}
            element={
              <PageWrapper back={back} main={main} routes={routes}>
                <Component routes={routes} />
              </PageWrapper>
            }
          />
        ))}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
}
