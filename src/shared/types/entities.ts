import type { Nullable } from '@/shared/types/utility-types';
import { ProteinType } from '../constants/product';
import { ActivityLevel, Gender, Goal } from '../constants/user-parameter';

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

export type ProductCategory = {
  id: number;
  name: string;
};

export type Product = {
  id: number;
  name: string;
  categoryId: ProductCategory['id'];
  kcal: string;
  protein: string;
  fat: string;
  carbs: string;
  fiber: string;
  unit: string;
  proteinType: ProteinType;
  externalId?: string;
  source?: string;
};

export type Recipe = {
  id: number;
  name: string;
  description: string;
  isPublic: boolean;
  products: Array<{
    amount: string;
    product: Product;
    productId: Product['id'];
    recipeId: Recipe['id'];
  }>;
  createdAt: string;
  createdById: User['id'];
};

export type Meal = {};
