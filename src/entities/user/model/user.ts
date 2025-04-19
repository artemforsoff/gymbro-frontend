import { createEffect, createStore } from 'effector';
import { api } from '@/shared/lib';
import { type User } from './types';
import { type Nullable } from '@/shared/types/utility-types';

export const $user = createStore<Nullable<User>>(null);

export const getMeFx = createEffect(() => {
  return api.get('user/me').json<User>();
});

$user.on(getMeFx.doneData, (_, user) => user);
