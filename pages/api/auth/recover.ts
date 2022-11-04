import { supabase } from 'app/supabase';
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(404).send({ message: 'Not found' });
    }

    const { error } = await supabase.auth.resetPasswordForEmail(req.body.email);

    if (error) {
      return res.status(400).send({ message: error.message, error });
    } else {
      throw new Error('WAT!');
      return res.status(200).send({ message: 'A reset link as been sent to your email address.' });
    }
  } catch (error) {
    res.status(400).send({ message: 'Something went terribly wrong. Try again.' });
    throw new Error(`Password recovery failed: ${JSON.stringify({ error })}`);
  }
}

export default handler;
