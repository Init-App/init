import type { NextApiRequest, NextApiResponse } from 'next';
import { Session, User } from '@supabase/gotrue-js';
import { supabase } from 'app/supabase';
import { validate } from 'app/utils/auth-handler';

const isSession = (session: Session | null): session is Session => !!session?.access_token;
const isUser = (user: User | null): user is User => !!user?.id;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
    await supabase.auth.setSession(data.session);
    res.redirect('/app');
  }

  res.status(400).send({ message: 'Something went terribly wrong. Try again.' });
  throw new Error(`Signin failed: ${JSON.stringify({ data, error })}`);
}
