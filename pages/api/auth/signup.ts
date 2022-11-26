import { supabaseServer } from 'app/utils/supabase-server';
import { isSession, isUser, validate } from 'app/utils/auth-handler';
import type { NextApiRequest, NextApiResponse } from 'next';
import { buildUrl } from 'app/utils/utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const supabase = supabaseServer(req, res);
    const { isError, body, password, email } = validate(req, res);

    if (isError) return res.json(body);
    const redirectTo = buildUrl(req.url, req.headers.host, req.body.redirectTo) ?? '/app';

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    if (error) {
      return res.status(400).json({ message: error.message, error });
    }

    if (isSession(data.session) && isUser(data.user)) {
      return res.status(200).json({ redirectTo });
    }
    return res.status(200).json({ message: 'An email with a signup link has been sent!' });
  } catch (error) {
    console.error('API/signup', error);
    return res.status(400).json({ message: 'Something terrible happened. Try again.', error });
  }
}

export default handler;
