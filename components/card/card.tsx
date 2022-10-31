import { FC, HTMLProps } from 'react';
import './card.scss';

interface Props extends HTMLProps<HTMLDivElement> {
  addClass?: string;
}

export const Card: FC<Props> = ({ addClass, ...props }) => (
  <div {...props} className={addClass ? `card ${addClass}` : 'card'} />
);
