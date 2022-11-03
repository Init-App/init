import 'app/utils/sentry.server.config';
import { Inter } from '@next/font/google';
import Script from 'next/script';
import { setup } from './utils/sentry.client.config';
import 'app/styles/globals.scss';
import 'app/styles/theme.scss';

const env = process.env.SENTRY_ENV ?? 'development';

const inter = Inter({
  subsets: ['latin'],
  weight: 'variable',
});

export default function RootLayout({ children }: { children: any }) {
  return (
    <html className={inter.className}>
      <head>
        <title>Initist</title>
        {env === 'production' && <Script src="/va/script.js" strategy="beforeInteractive" />}
        <Script
          src="https://browser.sentry-cdn.com/7.17.3/bundle.min.js"
          strategy="beforeInteractive"
          onLoad={setup}
        />
        <Script src="https://kit.fontawesome.com/921c6aec84.js" />
      </head>
      <body>{children}</body>
    </html>
  );
}
