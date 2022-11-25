import 'server-only';
import { Session, User } from '@supabase/gotrue-js';
import { supabaseServer } from 'app/utils/supabase-server';
import { validate } from 'app/utils/auth-handler';
import type { NextApiRequest, NextApiResponse } from 'next';

const isSession = (session: Session | null): session is Session => !!session?.access_token;
const isUser = (user: User | null): user is User => !!user?.id;

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
      res.redirect('/app');
    }

    res.status(400).send({ message: 'Something went terribly wrong. Try again.' });
    throw new Error(`Signin failed: ${JSON.stringify({ data, error })}`);
  } catch (error) {
    res.status(500).send({ message: 'Something went terribly wrong. Try again.' });
    throw error;
  }
}

export default handler;
