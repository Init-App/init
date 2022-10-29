import { FC, HTMLProps } from 'react';
import './form.scss';

export const Form: FC<HTMLProps<HTMLFormElement>> = ({ ...props }) => (
  <form {...props} className="form" />
);
