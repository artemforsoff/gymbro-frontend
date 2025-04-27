import type { Nullable } from '@/shared/types/utility-types';
import { ProteinType } from '../constants/product';
import { ActivityLevel, Gender, Goal } from '../constants/user-parameter';

export type Nutrients = {
  kcal: number;
  protein: number;
  fat: number;
  carbs: number;
  fiber?: number;
};

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
  imageUrl: Nullable<string>;
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

export type Meal = {
  datetime: string;
  id: number;
  mealType: Nullable<string>;
  name: string;
  note: Nullable<string>;
  products: Array<{
    amount: string;
    mealId: Meal['id'];
    productId: Product['id'];
    product: Product;
  }>;
  recipes: Array<{
    mealId: Meal['id'];
    portions: string;
    products: Array<{
      amount: string;
      productId: Product['id'];
      recipeId: Recipe['id'];
      mealId: Meal['id'];
      product: Product;
    }>;
    recipe: Recipe;
    recipeId: Recipe['id'];
  }>;
  userId: User['id'];
};
