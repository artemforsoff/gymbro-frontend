import { type FC } from 'react';
import { HamIcon, SproutIcon } from 'lucide-react';
import { type Nutrients } from '@/shared/types/entities';
import styles from './styles.module.scss';
import { clsx } from 'clsx';

type ProteinTypesProps = Pick<Nutrients, 'protein' | 'animalProtein' | 'plantProtein'>;

export const ProteinTypes: FC<ProteinTypesProps> = ({ animalProtein, plantProtein }) => {
  const iconWidth = 24;

  return (
    <ul className={styles['protein-types']}>
      <li className={clsx(styles['protein-type'], styles['protein-type--animal'])}>
        <HamIcon size={iconWidth} style={{ minWidth: iconWidth }} />

        <span>{animalProtein}</span>
      </li>

      <li className={clsx(styles['protein-type'], styles['protein-type--plant'])}>
        <SproutIcon size={iconWidth} style={{ minWidth: iconWidth }} />

        <span>{plantProtein}</span>
      </li>
    </ul>
  );
};
