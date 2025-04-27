import { retrieveRawInitData } from '@telegram-apps/sdk-react';
import { api } from '@/shared/lib';
import { createEffect, sample } from 'effector';
import { getMeFx } from './user';

const signInViaTelegramFx = createEffect(async () => {
  const initData = retrieveRawInitData();

  if (!initData) {
    throw new Error('initData not available');
  }

  const { accessToken, refreshToken } = await api
    .post('auth/tg', {
      json: {
        initData,
      },
    })
    .json<{ accessToken: string; refreshToken: string }>();

  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);

  return { accessToken, refreshToken };
});

sample({
  clock: getMeFx.fail,
  target: signInViaTelegramFx,
});

sample({
  clock: signInViaTelegramFx.done,
  target: getMeFx,
});
