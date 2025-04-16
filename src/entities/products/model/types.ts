import { ProteinType } from '@/shared/constants/product';

export type ProductCategory = {
  id: number;
  name: string;
};

export type Product = {
  id: number;
  name: string;
  categoryId: ProductCategory['id'];
  kcal: number;
  protein: number;
  fat: number;
  carbs: number;
  fiber: number;
  unit: string;
  proteinType: ProteinType;
  externalId?: string;
  source?: string;
};
