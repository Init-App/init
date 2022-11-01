import Image from 'next/image';
import spinner from './spinner.svg';
import type { FC } from 'react';

export const Spinner: FC = () => <Image src={spinner} alt="Loading..." />;
