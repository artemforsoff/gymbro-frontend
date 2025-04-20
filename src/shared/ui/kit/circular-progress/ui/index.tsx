import { type FC, type SVGProps } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';

type CircularProgressProps = SVGProps<SVGSVGElement> & {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
};

export const CircularProgress: FC<CircularProgressProps> = ({
  progress,
  size = 48,
  strokeWidth = 4,
  color = 'var(--gb-accent-color)',
  bgColor = 'rgba(var(--gb-accent-color--rgb), 0.1)',
  className,
  ...props
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg
      className={clsx(styles['circular-progress'], className)}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      {...props}
    >
      <circle
        className={styles.bg}
        stroke={bgColor}
        strokeWidth={strokeWidth}
        fill="none"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        className={styles.fg}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        r={radius}
        cx={size / 2}
        cy={size / 2}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  );
};
