import { ProteinType } from '@/shared/constants/product';

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
