import { useMemo } from 'react';
import { Navigate, Route, Routes, HashRouter } from 'react-router-dom';
import { retrieveLaunchParams, useSignal, isMiniAppDark } from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';

import { routes } from '@/pages/routes';
import { userModel } from '@/entities/user/model/index';
import { createGate, useGate } from 'effector-react';
import { sample } from 'effector';
import { SnackbarProvider, ModalProvider } from '@/shared/ui';
import { Header } from './layout/header';
import { PageWrapper } from './layout/page-wrapper';

const AppGate = createGate();

sample({
  clock: AppGate.open,
  target: userModel.effects.getMeFx,
});

export function App() {
  useGate(AppGate);

  const lp = useMemo(() => retrieveLaunchParams(), []);
  const isDark = useSignal(isMiniAppDark);

  return (
    <AppRoot
      className="app"
      appearance={isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.tgWebAppPlatform) ? 'ios' : 'base'}
    >
      <HashRouter>
        <SnackbarProvider />

        <ModalProvider />

        <Header routes={routes} />

        <main>
          <Routes>
            {Object.values(routes).map(({ Component, path, back, navigation }) => (
              <Route
                key={path}
                path={path}
                element={
                  <PageWrapper back={back} navigation={navigation} routes={routes}>
                    <Component routes={routes} />
                  </PageWrapper>
                }
              />
            ))}

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </HashRouter>
    </AppRoot>
  );
}
