import { createEffect, createStore } from 'effector';
import { api } from '@/shared/lib';
import { type User } from './types';
import { type Nullable } from '@/shared/types/utility-types';

export const $user = createStore<Nullable<User>>(null);

export const getMeFx = createEffect(() => {
  return api.get('user/me').json<User>();
});

$user.on(getMeFx.doneData, (_, user) => user);

export const updateProfileFx = createEffect(
  (user: Pick<User, 'birthDate' | 'firstName' | 'lastName' | 'languageCode'>) => {
    return api
      .put('user/me', {
        json: user,
      })
      .json<User>();
  },
);

$user.on(updateProfileFx.doneData, (_, user) => user);
