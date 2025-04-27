import { type PageProps } from '@/pages/types';
import { type FC } from 'react';

export const WorkoutPage: FC<PageProps> = () => {
  return <pre>{JSON.stringify(window.location.href)}</pre>;
};
