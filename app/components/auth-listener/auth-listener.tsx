'use client';

import { supabaseBrowser } from 'app/utils/supabase-browser';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function AuthListener({ accessToken }: { accessToken?: string }) {
  const router = useRouter();

  useEffect(() => {
    supabaseBrowser.auth.onAuthStateChange((_, session) => {
      if (session?.access_token !== accessToken) {
        router.refresh();
      }
    });
  }, [accessToken, router]);

  return null;
}
