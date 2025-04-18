import { getAge } from '@/shared/lib/get-age';
import { $user } from './user';
import { $userParameters } from './user-parameters';
import { combine } from 'effector';
import { calcDailyNutrition } from '@/shared/lib/calc-daily-nutrition';

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
