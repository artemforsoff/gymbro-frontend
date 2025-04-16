import {
  type ActivityLevel,
  ACTIVITY_LEVELS,
  type Gender,
  GENDERS,
  type Goal,
  GOALS,
} from '@/shared/constants/user-parameter';

export const genderOptions: Record<Gender, { value: Gender; label: string }> = {
  [GENDERS.female]: { value: GENDERS.female, label: 'Женский' },
  [GENDERS.male]: { value: GENDERS.male, label: 'Мужской' },
};

export const activityLevelOptions: Record<ActivityLevel, { value: ActivityLevel; label: string }> =
  {
    [ACTIVITY_LEVELS.low]: { value: ACTIVITY_LEVELS.low, label: 'Низкий' },
    [ACTIVITY_LEVELS.medium]: { value: ACTIVITY_LEVELS.medium, label: 'Средний' },
    [ACTIVITY_LEVELS.high]: { value: ACTIVITY_LEVELS.high, label: 'Высокий' },
  };

export const goalOptions: Record<Goal, { value: Goal; label: string }> = {
  [GOALS.lose]: { value: GOALS.lose, label: 'Похудение' },
  [GOALS.maintain]: { value: GOALS.maintain, label: 'Поддержание веса' },
  [GOALS.gain]: { value: GOALS.gain, label: 'Набор массы' },
};
