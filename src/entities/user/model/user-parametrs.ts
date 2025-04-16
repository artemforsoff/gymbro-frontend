import { api } from '@/shared/lib/api';
import { Nullable } from '@/shared/types/utility-types';
import { createEffect, createStore } from 'effector';

export type UserParameters = {
  activityLevel: 'low' | 'medium' | 'high';
  goal: 'lose' | 'maintain' | 'gain';
  height: number;
  sex: 'male' | 'female';
  weight: string;
};

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
