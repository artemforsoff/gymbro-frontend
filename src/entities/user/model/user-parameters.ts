import { api } from '@/shared/lib/api';
import { type Nullable } from '@/shared/types/utility-types';
import { createEffect, createStore, sample } from 'effector';
import { UserParameters } from './types';
import { getMeFx } from './user';

export const $userParameters = createStore<Nullable<UserParameters>>(null);

export const getUserParametersFx = createEffect(() => {
  return api.get('user/parameters').json<UserParameters>();
});

$userParameters.on(getUserParametersFx.doneData, (_, parameters) => parameters);

sample({
  clock: getMeFx.done,
  target: getUserParametersFx,
});
