import { PropsWithChildren } from 'react';
import 'app/styles/centered-layout.scss';

export default function OnBoardingLayout({ children }: PropsWithChildren) {
  return (
    <main className="main">
      <section className="container">{children}</section>
    </main>
  );
}
