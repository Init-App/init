import type { NextApiRequest, NextApiResponse } from 'next';
import { Session, User } from '@supabase/gotrue-js';
import { supabase } from 'app/supabase';
import { validate } from 'app/utils/auth-handler';

const isSession = (session: Session | null): session is Session => !!session?.access_token;
const isUser = (user: User | null): user is User => !!user?.id;

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { isError, body, password, email } = validate(req, res);

  if (isError) return res.send(body);

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return res.status(400).send({ message: error.message, error });
    }

    if (isSession(data.session) && isUser(data.user)) {
      await supabase.auth.setSession(data.session);
      res.redirect('/app');
    }
  } catch (error) {
    res.status(400).send({ message: 'Something terrible happened. Try again.' });
    throw new Error(`Signup error: ${JSON.stringify({ error })}`);
  }
}

export default handler;
