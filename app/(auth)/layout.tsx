import type { PropsWithChildren } from 'react';
import { Card } from 'app/components';
import 'app/styles/centered-layout.scss';

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className="main">
      <section className="container">
        <Card>{children}</Card>
      </section>
    </main>
  );
}
