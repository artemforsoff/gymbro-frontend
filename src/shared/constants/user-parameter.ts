export const GENDERS = {
  male: 'male',
  female: 'female',
} as const;

export type Gender = keyof typeof GENDERS;

export const ACTIVITY_LEVELS = {
  low: 'low',
  medium: 'medium',
  high: 'high',
} as const;

export type ActivityLevel = keyof typeof ACTIVITY_LEVELS;

export const GOALS = {
  lose: 'lose',
  maintain: 'maintain',
  gain: 'gain',
} as const;

export type Goal = keyof typeof GOALS;
