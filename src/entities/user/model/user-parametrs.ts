import { api } from '@/shared/lib/api';
import { type Nullable } from '@/shared/types/utility-types';
import { createEffect, createStore } from 'effector';
import { UserParameters } from './types';

export const $userParameters = createStore<Nullable<UserParameters>>(null);

export const getUserParametersFx = createEffect(() => {
  return api.get('user/parameters').json<UserParameters>();
});

$userParameters.on(getUserParametersFx.doneData, (_, parameters) => parameters);
