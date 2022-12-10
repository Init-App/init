import type { PropsWithChildren } from 'react';

export default async function AppLayout({ children }: PropsWithChildren) {
  return <div>You are logged in now...{children}</div>;
}
