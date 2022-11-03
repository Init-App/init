import 'app/utils/sentry.server.config';
import { Inter } from '@next/font/google';
import Script from 'next/script';
import 'app/styles/globals.scss';
import 'app/styles/theme.scss';

const inter = Inter({
  subsets: ['latin'],
  weight: 'variable',
});

export default function RootLayout({ children }: { children: any }) {
  return (
    <html className={inter.className}>
      <head>
        <title>Initist</title>
        <Script src="https://kit.fontawesome.com/921c6aec84.js" />
      </head>
      <body>{children}</body>
    </html>
  );
}
