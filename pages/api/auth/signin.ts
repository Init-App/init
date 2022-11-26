import { supabaseServer } from 'app/utils/supabase-server';
import { isSession, isUser, validate } from 'app/utils/auth-handler';
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const supabase = supabaseServer(req, res);
    const { isError, password, body, email } = validate(req, res);

    if (isError) return res.send(body);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(400).send({ message: error.message, error });
    }

    if (isSession(data.session) && isUser(data.user)) {
      const redirectUrl = req.query.redirectedFrom ?? '/app';
      return res.redirect(Array.isArray(redirectUrl) ? redirectUrl[0] : redirectUrl);
    }

    return res.status(400).send({ message: 'Something went terribly wrong. Try again.' });
  } catch (error) {
    res.status(500).send({ message: 'Something went terribly wrong. Try again.' });
    throw error;
  }
}

export default handler;
