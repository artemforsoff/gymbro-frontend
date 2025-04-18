import { combine } from 'effector';
import { getAge, calcDailyNutrition } from '@/shared/lib';
import { $user } from './user';
import { $userParameters } from './user-parameters';

const $age = $user.map((user) => (user?.birthDate ? getAge(user.birthDate) : null));

export const $dailyNutrition = combine({
  userParameters: $userParameters,
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
