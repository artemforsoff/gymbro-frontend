import { combine, createEvent, createStore, sample } from 'effector';
import { getAge, calcDailyNutrition } from '@/shared/lib';
import { $user } from './user';
import { DateTime } from 'luxon';
import { type UserParameters } from '@/shared/types/entities';
import { type Nullable } from '@/shared/types/utility-types';
import { getUserParametersByDateFx } from './user-parameters';

const $age = $user.map((user) => (user?.birthDate ? getAge(user.birthDate) : null));

export const activityDayChanged = createEvent<string>();

export const $activityDay = createStore(DateTime.now().toFormat('yyyy-MM-dd')).on(
  activityDayChanged,
  (_, date) => date,
);

export const $userParametersInActivityDay = createStore<Nullable<UserParameters>>(null).on(
  getUserParametersByDateFx.doneData,
  (_, parameters) => parameters,
);

sample({
  clock: $activityDay,
  source: $activityDay,
  fn: (date) => ({ date }),
  target: getUserParametersByDateFx,
});

export const $targetNutritionInActivityDay = combine({
  userParameters: $userParametersInActivityDay,
  age: $age,
}).map(({ userParameters, age }) => {
  if (userParameters && age) {
    return calcDailyNutrition({
      ...userParameters,
      weight: Number(userParameters.weight),
      age,
    });
  }
  return null;
});
