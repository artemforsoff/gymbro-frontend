import { UserParameters } from '@/entities/user/model/types';
import { api } from '@/shared/lib/api';
import { createEffect } from 'effector';

export const setUserParametersFx = createEffect((parameters: UserParameters) => {
  return api
    .post('user/parameters', {
      json: parameters,
    })
    .json<UserParameters>();
});
