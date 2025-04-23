import { userModel } from '@/entities/user/model';
import { api } from '@/shared/lib';
import { type UserParameters } from '@/shared/types/entities';
import { createEffect } from 'effector';

export const setUserParametersFx = createEffect((parameters: UserParameters) => {
  return api
    .post('user/parameters', {
      json: parameters,
    })
    .json<UserParameters>();
});

userModel.stores.$userParameters.on(setUserParametersFx.doneData, (_, parameters) => parameters);
