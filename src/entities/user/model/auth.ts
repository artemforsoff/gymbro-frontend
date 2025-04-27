import { retrieveRawInitData, retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { api } from '@/shared/lib';
import { createEffect, sample } from 'effector';
import { getMeFx } from './user';

const signInViaTelegramFx = createEffect(() => {
  const initData = retrieveRawInitData();
  const lp = retrieveLaunchParams();

  console.log({ initData, lp });

  if (!initData) {
    throw new Error('initData not available');
  }

  return api
    .post('auth/tg', {
      json: {
        initData,
      },
    })
    .json<boolean>();
});

sample({
  clock: getMeFx.fail,
  target: signInViaTelegramFx,
});

sample({
  clock: signInViaTelegramFx.done,
  target: getMeFx,
});
