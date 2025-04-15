import { api } from '@/shared/lib/api';
import { type Nullable } from '@/shared/types/utility-types';
import { createEffect, createStore, sample } from 'effector';

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

export type UserParameters = {
  activityLevel: 'low' | 'medium' | 'high';
  goal: 'lose' | 'maintain' | 'gain';
  height: number;
  sex: 'male' | 'female';
  weight: string;
};

export const $user = createStore<Nullable<User>>(null);

export const getMeFx = createEffect(() => {
  return api.get('user/me').json<User>();
});

$user.on(getMeFx.doneData, (_, user) => user);

export const $userParameters = createStore<Nullable<UserParameters>>(null);

export const setUserParametersFx = createEffect((parameters: UserParameters) => {
  return api
    .post('user/parameters', {
      json: parameters,
    })
    .json<UserParameters>();
});

export const getUserParametersFx = createEffect(() => {
  return api.get('user/parameters').json<UserParameters>();
});

$userParameters.on(getUserParametersFx.doneData, (_, parameters) => parameters);

export const signInViaTelegramFx = createEffect(() => {
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
