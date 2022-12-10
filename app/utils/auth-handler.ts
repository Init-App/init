import type { NextApiRequest, NextApiResponse } from 'next';
import type { Session, User } from '@supabase/gotrue-js';

export const validate = (req: NextApiRequest, res: NextApiResponse) => {
  const body = { message: '' };
  const isError = false;
  if (req.method !== 'POST') {
    res.status(404);
    body.message = 'Not found';
  }

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    body.message = 'Email and Password are required';
  }
  return {
    isError,
    body,
    email,
    password,
  };
};

export const isSession = (session: Session | null): session is Session => !!session?.access_token;
export const isUser = (user: User | null): user is User => !!user?.id;
