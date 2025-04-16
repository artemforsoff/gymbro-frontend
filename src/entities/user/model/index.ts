import { api } from '@/shared/lib/api';
import { type Nullable } from '@/shared/types/utility-types';
import { createEffect, createStore, sample } from 'effector';
import { $userParameters, getUserParametersFx, setUserParametersFx } from './user-parametrs';

export type User = {
  avatarUrl: Nullable<string>;
  birthDate: Nullable<string>;
  createdAt: string;
  firstName: string;
  id: number;
  languageCode: string;
  lastName: string;
  tgId: string;
};

const $user = createStore<Nullable<User>>(null);

const getMeFx = createEffect(() => {
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

sample({
  clock: getMeFx.done,
  target: getUserParametersFx,
});

export const userModel = {
  effects: {
    getMeFx,
    setUserParametersFx,
  },
  stores: {
    $user,
    $userParameters,
  },
};
