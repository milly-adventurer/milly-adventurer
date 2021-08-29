import { ReactNode } from 'react';
import getClassNames from '../../helpers/classNames';
import styles from './Button.module.scss';

export enum Type {
  FILLED = 'filled',
  OUTLINE = 'outline',
}

export enum Size {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

const cn = getClassNames(styles);

interface Props {
  type?: Type;
  size?: Size;
  label: ReactNode;
  className?: string;
  buttonType?: "button" | "submit" | "reset";
  onClick?(): void;
}

const Button = ({
  type = Type.FILLED,
  size = Size.MEDIUM,
  label,
  className,
  buttonType = 'button',
  onClick,
}: Props) => {
  return (
    <button type={buttonType} onClick={onClick} className={`${cn('button', size, type)} ${className}`}>
      {label}
    </button>
  );
};

export default Button;
