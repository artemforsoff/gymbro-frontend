import { userModel } from '@/entities/user/model';
import { api } from '@/shared/lib';
import { type UserParameters } from '@/shared/types/entities';
import { createEffect, sample } from 'effector';
import { DateTime } from 'luxon';

export const setUserParametersFx = createEffect((parameters: UserParameters) => {
  return api
    .post('user/parameters', {
      json: parameters,
    })
    .json<UserParameters>();
});

sample({
  clock: setUserParametersFx.doneData,
  fn: () => ({ date: DateTime.now().toFormat('yyyy-MM-dd') }),
  target: userModel.effects.getUserParametersByDateFx,
});
