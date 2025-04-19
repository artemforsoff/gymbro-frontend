import { createEffect } from 'effector';
import { userModel } from '@/entities/user/model';
import { type User } from '@/entities/user/model/types';
import { api } from '@/shared/lib';

export const updateProfileFx = createEffect(
  (user: Pick<User, 'birthDate' | 'firstName' | 'lastName'>) => {
    return api
      .put('user/me', {
        json: user,
      })
      .json<User>();
  },
);

userModel.stores.$user.on(updateProfileFx.doneData, (_, user) => user);
