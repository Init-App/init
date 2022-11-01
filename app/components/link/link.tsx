import BaseLink from 'next/link';
import type { LinkProps as BaseLinkProps } from 'next/link';
import type { FC, ReactNode } from 'react';
import './link.scss';

interface LinkProps extends BaseLinkProps {
  children: ReactNode;
}

export const Link: FC<LinkProps> = ({ children, ...props }) => (
  <BaseLink {...props} className="link">
    {children}
  </BaseLink>
);
