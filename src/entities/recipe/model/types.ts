import { type Product } from '@/entities/product/model/types';
import { User } from '@/entities/user/model/types';

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
