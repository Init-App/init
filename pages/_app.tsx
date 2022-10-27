import { useState } from 'react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createEmotionCache } from '../utils/create-emotion-cache';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { lightTheme } from '../styles/theme/light-theme';

const clientSideEmotionCache = createEmotionCache();

type Props = AppProps<{ initialSession: Session }> & { emotionCache: EmotionCache };

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: Props) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <SessionContextProvider
          initialSession={pageProps.initialSession}
          supabaseClient={supabaseClient}
        >
          <Component {...pageProps} />
        </SessionContextProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
