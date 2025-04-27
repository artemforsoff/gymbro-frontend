import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';

import { EnvUnsupported } from '@/app/env-unsupported.tsx';
import { init } from '@/init.ts';

import './styles/app.scss';
import { ErrorBoundary } from './error-boundary.tsx';
import { App } from './app.tsx';

// mock the environment in case, we are outside Telegram.
// import '../mockEnv.ts';

const root = ReactDOM.createRoot(document.getElementById('root')!);

try {
  const { tgWebAppPlatform: platform, tgWebAppStartParam: startParam = '' } =
    retrieveLaunchParams();
  const debug = startParam.includes('debug') || import.meta.env.DEV;

  // configure all application dependencies.
  await init({
    debug,
    eruda: debug && ['ios', 'android'].includes(platform),
    mockForMacOS: platform === 'macos',
  }).then(() => {
    root.render(
      <StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StrictMode>,
    );
  });
} catch (e) {
  console.error(e);
  root.render(<EnvUnsupported />);
}
