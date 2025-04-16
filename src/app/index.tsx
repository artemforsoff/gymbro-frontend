// include Telegram UI styles first to allow our code override the package CSS.
import '@telegram-apps/telegram-ui/dist/styles.css';

import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';

import { EnvUnsupported } from '@/app/env-unsupported.tsx';
import { init } from '@/init.ts';

import './app.scss';
import { ErrorBoundary } from './error-boundary.tsx';
import { App } from './app.tsx';

// mock the environment in case, we are outside Telegram.
// import '../mockEnv.ts';

const root = ReactDOM.createRoot(document.getElementById('root')!);

try {
  const launchParams = retrieveLaunchParams();
  const { tgWebAppPlatform: platform } = launchParams;
  const debug = (launchParams.tgWebAppStartParam || '').includes('debug') || import.meta.env.DEV;

  // configure all application dependencies.
  await init({
    debug,
    eruda: debug && ['ios', 'android', 'tdesktop'].includes(platform),
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
  root.render(<EnvUnsupported />);
}
