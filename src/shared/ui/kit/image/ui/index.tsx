import { useState, type DetailedHTMLProps, type FC, type ImgHTMLAttributes } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { ImageOffIcon } from 'lucide-react';

type ImageProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {};

export const Image: FC<ImageProps> = ({ className, ...props }) => {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className={clsx(styles.image, className)}>
      <img {...props} onError={() => setImageFailed(true)} />

      {imageFailed && <ImageOffIcon className={styles.image__error} />}
    </div>
  );
};
