import { supabaseServer } from 'app/utils/supabase-server';
import { isSession, isUser, validate } from 'app/utils/auth-handler';
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const supabase = supabaseServer(req, res);
    const { isError, body, password, email } = validate(req, res);

    if (isError) {
      return res.json(body);
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: req.body.redirectTo,
      },
    });

    if (error) {
      return res.status(400).json({ message: error.message, error });
    }

    if (isSession(data.session) && isUser(data.user)) {
      const redirectUrl = req.query.redirectedFrom ?? '/app';
      return res
        .status(200)
        .json({ redirectTo: Array.isArray(redirectUrl) ? redirectUrl[0] : redirectUrl });
    }
    return res.status(200).json({ message: 'An email with a signup link has been sent!' });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Something terrible happened. Try again.', error });
  }
}

export default handler;
