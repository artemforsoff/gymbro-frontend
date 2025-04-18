import { type ActivityLevel, type Gender, type Goal } from '@/shared/constants/user-parameter';
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
