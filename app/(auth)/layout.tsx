import { Card } from 'components';
import 'styles/centered-layout.scss';
import type { PropsWithChildren } from 'react';

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className="main">
      <section className="container">
        <Card>{children}</Card>
      </section>
    </main>
  );
}
