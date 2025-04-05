import { type FC } from 'react';

const tg = window.Telegram.WebApp;

tg.ready();

export const App: FC = () => {
  return <div>{tg.initDataUnsafe.user?.username}</div>;
};
