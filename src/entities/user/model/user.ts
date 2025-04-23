import { createEffect, createStore } from 'effector';
import { api } from '@/shared/lib';
import { type Nullable } from '@/shared/types/utility-types';
import { type User } from '@/shared/types/entities';

export const $user = createStore<Nullable<User>>(null);

export const getMeFx = createEffect(() => {
  return api.get('user/me').json<User>();
});

$user.on(getMeFx.doneData, (_, user) => user);
