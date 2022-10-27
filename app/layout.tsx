import { Inter } from '@next/font/google';

const inter = Inter();

type Props = { children: JSX.Element };

export default function RootLayout({ children }: Props) {
  return (
    <html className={inter.className}>
      <head />
      <body>{children}</body>
    </html>
  );
}
