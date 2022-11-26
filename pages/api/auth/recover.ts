import { supabaseServer } from 'app/utils/supabase-server';
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const supabase = supabaseServer(req, res);
    if (req.method !== 'POST') {
      return res.status(404).json({ message: 'Not found' });
    }

    const { error } = await supabase.auth.resetPasswordForEmail(req.body.email, {
      redirectTo: req.body.redirectTo,
    });

    if (error) {
      return res.status(400).json({ message: error.message, error });
    } else {
      return res.status(200).json({ message: 'A reset link as been sent to your email address.' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Something went terribly wrong. Try again.' });
    throw error;
  }
}

export default handler;
