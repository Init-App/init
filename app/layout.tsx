import { headers, cookies } from 'next/headers';
import { Inter } from '@next/font/google';
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import 'app/styles/globals.scss';
import 'app/styles/theme.scss';
import Script from 'next/script';
import 'server-only';
import { Database } from 'types/database.types';
import AuthListener from './components/auth-listener/auth-listener';
import { createServerSentryClient } from './utils/sentry.server.config';

createServerSentryClient();

const inter = Inter({
  subsets: ['latin'],
  weight: 'variable',
});

export default async function RootLayout({ children }: { children: any }) {
  const supabase = createServerComponentSupabaseClient<Database>({ headers, cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  return (
    <html className={inter.className}>
      <head>
        <title>Initist</title>
      </head>
      <Script src="https://browser.sentry-cdn.com/7.19.0/bundle.tracing.min.js"></Script>
      <Script src="https://kit.fontawesome.com/921c6aec84.js" />
      <body>
        <AuthListener accessToken={session?.access_token} />
        {children}
      </body>
    </html>
  );
}

export const revalidate = 0;
