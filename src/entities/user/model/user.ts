import { Nullable } from '@/shared/types/utility-types';
import { createEffect, createStore, sample } from 'effector';
import { User } from './types';
import { api } from '@/shared/lib/api';

export const $user = createStore<Nullable<User>>(null);

export const getMeFx = createEffect(() => {
  return api.get('user/me').json<User>();
});

$user.on(getMeFx.doneData, (_, user) => user);

const signInViaTelegramFx = createEffect(() => {
  const initData = window.Telegram?.WebApp?.initData;

  if (!initData) {
    throw new Error('initData not available');
  }

  return api
    .post('api/auth/tg', {
      json: {
        initData,
      },
    })
    .json();
});

sample({
  clock: signInViaTelegramFx.done,
  target: getMeFx,
});

sample({
  clock: getMeFx.fail,
  target: signInViaTelegramFx,
});
