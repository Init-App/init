import { Inter } from '@next/font/google';
import 'app/utils/sentry.server.config';
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
        <script
          src="https://kit.fontawesome.com/921c6aec84.js"
          crossOrigin="anonymous"
          async
        ></script>
        {env === 'production' && <script async src="/va/script.js"></script>}
      </head>
      <body>{children}</body>
    </html>
  );
}
