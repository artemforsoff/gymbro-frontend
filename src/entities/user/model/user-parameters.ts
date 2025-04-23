import { createEffect, createStore, sample } from 'effector';
import { api } from '@/shared/lib';
import { getMeFx } from './user';
import { type Nullable } from '@/shared/types/utility-types';
import { type UserParameters } from '@/shared/types/entities';

export const $userParameters = createStore<Nullable<UserParameters>>(null);

export const getUserParametersFx = createEffect(() => {
  return api.get('user/parameters').json<UserParameters>();
});

$userParameters.on(getUserParametersFx.doneData, (_, parameters) => parameters);

sample({
  clock: getMeFx.done,
  target: getUserParametersFx,
});
