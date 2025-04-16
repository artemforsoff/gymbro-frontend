export const PROTEIN_TYPES = {
  animal: 'animal',
  plant: 'plant',
  mixed: 'mixed',
  unknown: 'unknown',
} as const;

export type ProteinType = keyof typeof PROTEIN_TYPES;
