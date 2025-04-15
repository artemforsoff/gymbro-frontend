import { useMemo } from 'react';
import { Navigate, Route, Routes, HashRouter } from 'react-router-dom';
import { retrieveLaunchParams, useSignal, isMiniAppDark } from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';

import { routes } from '@/app/routes';
import { userModel } from '@/entities/user/model';
import { createGate, useGate } from 'effector-react';
import { sample } from 'effector';
import { SnackbarHost } from '@/shared/ui/snackbar-host';

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
      appearance={isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.tgWebAppPlatform) ? 'ios' : 'base'}
    >
      <HashRouter>
        <SnackbarHost />
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </AppRoot>
  );
}
