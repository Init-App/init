import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from 'types/database.types';
import type { NextApiRequest, NextApiResponse } from 'next';

export const supabaseServer = (req: NextApiRequest, res: NextApiResponse) =>
  createServerSupabaseClient<Database>({ res, req });
