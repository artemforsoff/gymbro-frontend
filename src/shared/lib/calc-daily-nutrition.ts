import {
  type ActivityLevel,
  ACTIVITY_LEVELS,
  type Gender,
  GENDERS,
  type Goal,
  GOALS,
} from '../constants/user-parameter';
import { type Nutrients } from '../types/entities';

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

// Constants for BMR calculation (Mifflin–St Jeor)
const BMR_WEIGHT_COEFF = 10;
const BMR_HEIGHT_COEFF = 6.25;
const BMR_AGE_COEFF = 5;
const BMR_MALE_ADJUSTMENT = 5;
const BMR_FEMALE_ADJUSTMENT = -161;

// Macronutrient calorie values
const KCAL_PER_GRAM_PROTEIN = 4;
const KCAL_PER_GRAM_CARBS = 4;
const KCAL_PER_GRAM_FAT = 9;

// Macronutrient per kg weight
const PROTEIN_PER_KG = 2;
const FAT_PER_KG = 1;

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
}): Nutrients => {
  const { activityLevel, goal, height, sex, weight, age } = params;

  // 1. BMR (Basal Metabolic Rate)
  let BMR = BMR_WEIGHT_COEFF * weight + BMR_HEIGHT_COEFF * height - BMR_AGE_COEFF * age;

  BMR += sex === GENDERS.male ? BMR_MALE_ADJUSTMENT : BMR_FEMALE_ADJUSTMENT;

  // 2. Apply activity factor
  const activityFactor = activityFactorMap[activityLevel];
  let kcal = BMR * activityFactor;

  // 3. Adjust for goal
  kcal += goalAdjustment[goal];

  // 4. macronutrient breakdown
  const protein = weight * PROTEIN_PER_KG;
  const proteinKcal = protein * KCAL_PER_GRAM_PROTEIN;

  const fats = weight * FAT_PER_KG;
  const fatKcal = fats * KCAL_PER_GRAM_FAT;

  const remainingKcal = kcal - (proteinKcal + fatKcal);
  const carbs = remainingKcal / KCAL_PER_GRAM_CARBS;

  return {
    kcal: Math.round(kcal),
    protein: Math.round(protein),
    fat: Math.round(fats),
    carbs: Math.round(carbs),
  };
};
