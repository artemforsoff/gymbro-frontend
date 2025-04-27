import { retrieveRawInitData } from '@telegram-apps/sdk-react';
import { api } from '@/shared/lib';
import { createEffect, sample } from 'effector';
import { getMeFx } from './user';

const signInViaTelegramFx = createEffect(() => {
  const initData = retrieveRawInitData();

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

signInViaTelegramFx.watch(() => {
  const initData = retrieveRawInitData();

  console.log('initData', initData);
});

sample({
  clock: getMeFx.fail,
  target: signInViaTelegramFx,
});

sample({
  clock: signInViaTelegramFx.done,
  target: getMeFx,
});
