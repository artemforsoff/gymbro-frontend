import { productModel } from '@/entities/products';
import { PROTEIN_TYPES, type ProteinType } from '@/shared/constants/product';

export const proteinTypeOptions: Record<ProteinType, { value: ProteinType; label: string }> = {
  [PROTEIN_TYPES.animal]: { value: PROTEIN_TYPES.animal, label: 'Животный' },
  [PROTEIN_TYPES.plant]: { value: PROTEIN_TYPES.plant, label: 'Растительный' },
  [PROTEIN_TYPES.mixed]: { value: PROTEIN_TYPES.mixed, label: 'Смешанный' },
  [PROTEIN_TYPES.unknown]: { value: PROTEIN_TYPES.unknown, label: 'Неизвестно' },
};

export const $productCategoryOptions = productModel.stores.$productCategories.map((categories) =>
  (categories || []).map((category) => ({
    value: category.id,
    label: category.name,
  })),
);
