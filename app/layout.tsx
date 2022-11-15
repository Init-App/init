import { Inter } from '@next/font/google';
import 'app/styles/globals.scss';
import 'app/styles/theme.scss';
import Script from 'next/script';
import { createServerSentryClient } from './utils/sentry.server.config';

createServerSentryClient();

const inter = Inter({
  subsets: ['latin'],
  weight: 'variable',
});

export default function RootLayout({ children }: { children: any }) {
  return (
    <html className={inter.className}>
      <head>
        <title>Initist</title>
      </head>
      <Script src="https://browser.sentry-cdn.com/7.19.0/bundle.tracing.min.js"></Script>
      <Script src="https://kit.fontawesome.com/921c6aec84.js" />
      <body>{children}</body>
    </html>
  );
}
