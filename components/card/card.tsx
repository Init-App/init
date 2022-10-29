import { FC, HTMLProps } from 'react';
import './card.scss';

export const Card: FC<HTMLProps<HTMLDivElement>> = (props) => <div {...props} className="card" />;
