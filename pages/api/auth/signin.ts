import { supabaseServer } from 'app/utils/supabase-server';
import { isSession, isUser, validate } from 'app/utils/auth-handler';
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const supabase = supabaseServer(req, res);
    const { isError, password, body, email } = validate(req, res);

    if (isError) return res.status(400).json(body);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ message: error.message, error });
    }

    if (isSession(data.session) && isUser(data.user)) {
      const redirectTo = req.body.redirectTo ?? '/app';
      return res.status(200).json({ redirectTo });
    }

    return res.status(400).json({ message: 'Something went terribly wrong. Try again.' });
  } catch (error) {
    console.error('API/signin', error);
    return res.status(400).json({ message: 'Something went terribly wrong. Try again.', error });
  }
}

export default handler;
