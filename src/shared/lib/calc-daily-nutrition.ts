import {
  type ActivityLevel,
  ACTIVITY_LEVELS,
  type Gender,
  GENDERS,
  type Goal,
  GOALS,
} from '../constants/user-parameter';

const activityFactorMap: Record<ActivityLevel, number> = {
  [ACTIVITY_LEVELS.low]: 1.2,
  [ACTIVITY_LEVELS.medium]: 1.55,
  [ACTIVITY_LEVELS.high]: 1.9,
};

const goalAdjustment: Record<Goal, number> = {
  [GOALS.lose]: -300,
  [GOALS.maintain]: 0,
  [GOALS.gain]: 300,
};

/**
 *
 * @description based at Mifflin–St Jeor
 */
export const calcDailyNutrition = (params: {
  activityLevel: ActivityLevel;
  goal: Goal;
  height: number;
  sex: Gender;
  weight: number;
  age: number;
}) => {
  const { activityLevel, goal, height, sex, weight, age } = params;

  // 1. BMR (Basal Metabolic Rate)
  let BMR = 10 * weight + 6.25 * height - 5 * age;

  if (sex === GENDERS.male) BMR += 5;
  if (sex === GENDERS.female) BMR -= 161;

  // 2. activity
  const activityFactor = activityFactorMap[activityLevel];
  let calories = BMR * activityFactor;

  // 3. goal
  calories += goalAdjustment[goal];

  // 4. calculate carbs, fat, protein based on calories
  const protein = weight * 2; // 2 g on 1kg of weight
  const proteinKcal = protein * 4;

  const fat = weight * 1; // 1 g on 1kg of weight
  const fatKcal = fat * 9;

  const remainingKcal = calories - (proteinKcal + fatKcal);
  const carbs = remainingKcal / 4;

  return {
    calories: Math.round(calories),
    protein: Math.round(protein),
    fat: Math.round(fat),
    carbs: Math.round(carbs),
  };
};
