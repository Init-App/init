import { createClient } from '@supabase/supabase-js';
import { definitions } from 'types/database.types';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error(`Must define process.env.NEXT_PUBLIC_SUPABASE_URL`);
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error(`Must define process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY`);
}

export const supabase = createClient<definitions>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: false,
    },
    global: {
      fetch: (...args) => fetch(...args),
    },
  },
);
