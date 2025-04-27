import { createEffect, createStore, sample } from 'effector';
import { api } from '@/shared/lib';
import { getMeFx } from './user';
import { type Nullable } from '@/shared/types/utility-types';
import { type UserParameters } from '@/shared/types/entities';
import { DateTime } from 'luxon';

export const $actualUserParameters = createStore<Nullable<UserParameters>>(null);

export const getUserParametersByDateFx = createEffect(({ date }: { date: string }) => {
  return api
    .get('user/parameters', {
      searchParams: { date },
    })
    .json<UserParameters>();
});

$actualUserParameters.on(getUserParametersByDateFx.doneData, (_, parameters) => parameters);

sample({
  clock: getMeFx.done,
  fn: () => ({ date: DateTime.now().toFormat('yyyy-MM-dd') }),
  target: getUserParametersByDateFx,
});
