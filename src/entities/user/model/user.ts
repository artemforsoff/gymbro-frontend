import { createEffect, createStore, sample } from 'effector';
import { api } from '@/shared/lib';
import { type Nullable } from '@/shared/types/utility-types';
import { type User } from '@/shared/types/entities';
import { retrieveRawInitData } from '@telegram-apps/sdk-react';

export const $user = createStore<Nullable<User>>(null);

export const authViaTgFx = createEffect(async () => {
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
});

export const getMeFx = createEffect(async () => {
  return api.get('user/me').json<User>();
});

$user.on(getMeFx.doneData, (_, user) => user);

sample({
  clock: authViaTgFx.done,
  target: getMeFx,
});

sample({
  clock: getMeFx.fail,
  target: authViaTgFx,
});

export const $isAuthLoading = createStore(true);

$isAuthLoading.on(getMeFx.done, () => false);
