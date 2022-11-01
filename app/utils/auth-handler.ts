import type { NextApiRequest, NextApiResponse } from 'next';

export const validate = (req: NextApiRequest, res: NextApiResponse) => {
  const body = { message: '' };
  let isError = false;
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
