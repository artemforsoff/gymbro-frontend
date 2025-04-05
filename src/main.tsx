import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';

const tg = window.Telegram.WebApp;

tg.ready();

const isInsideTelegram = Boolean(tg?.initData);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isInsideTelegram ? (
      <App />
    ) : (
      'Пожалуйста, открой приложение через Telegram'
    )}
  </StrictMode>
);
