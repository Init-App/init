'use client';

import { supabaseBrowser } from 'app/utils/supabase-browser';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SupabaseListener({ accessToken }: { accessToken?: string }) {
  const router = useRouter();

  useEffect(() => {
    supabaseBrowser.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== accessToken) {
        router.refresh();
      }
    });
  }, [accessToken, router]);

  return null;
}
