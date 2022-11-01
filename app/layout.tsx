import 'styles/globals.scss';
import 'styles/theme.scss';
import { Inter } from '@next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: 'variable',
});

export default function RootLayout({ children }: { children: any }) {
  return (
    <html className={inter.className}>
      <head>
        <script
          src="https://kit.fontawesome.com/921c6aec84.js"
          crossOrigin="anonymous"
          async
        ></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
