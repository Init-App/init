import { FC, HTMLProps } from 'react';
import './button.scss';

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  color?: 'brand' | 'accent';
  type?: 'button' | 'submit' | undefined;
}

export const Button: FC<ButtonProps> = ({ color = 'brand', ...props }) => (
  <button {...props} className={`button ${color}`} />
);
