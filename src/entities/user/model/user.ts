import { createEffect, createStore } from 'effector';
import { api } from '@/shared/lib';
import { type Nullable } from '@/shared/types/utility-types';
import { type User } from '@/shared/types/entities';
import { retrieveRawInitData } from '@telegram-apps/sdk-react';

export const $user = createStore<Nullable<User>>(null);

export const getMeFx = createEffect(async () => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
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
  }

  return api.get('user/me').json<User>();
});

$user.on(getMeFx.doneData, (_, user) => user);
