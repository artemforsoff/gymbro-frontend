import type { ActivityLevel, Gender, Goal } from '@/shared/constants';
import type { Nullable } from '@/shared/types/utility-types';

export type User = {
  avatarUrl: Nullable<string>;
  birthDate: Nullable<string>;
  createdAt: string;
  firstName: string;
  id: number;
  languageCode: string;
  lastName: string;
  tgId: string;
};

export type UserParameters = {
  activityLevel: ActivityLevel;
  goal: Goal;
  height: number;
  sex: Gender;
  weight: string;
};
