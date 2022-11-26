import { isSession } from 'app/utils/auth-handler';
import { supabaseServer } from 'app/utils/supabase-server';
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const supabase = supabaseServer(req, res);

    const validationMessage = 'You must supply a password.';
    if (!req.body.password) {
      return res
        .status(400)
        .json({ message: validationMessage, error: { message: validationMessage } });
    }

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      const sessionMessage = sessionError ? sessionError.message : 'What are you trying to do?';
      return res
        .status(400)
        .json({ message: sessionMessage, error: sessionError ?? sessionMessage });
    }

    if (isSession(session)) {
      const { data, error } = await supabase.auth.updateUser({
        password: req.body.password,
      });
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('has_completed_onboarding')
        .eq('user_id', data.user?.id)
        .single();

      if (error || userError) {
        return res
          .status(400)
          .json({ message: 'Could not update your password.', error: error ?? userError });
      }

      const redirectTo = !userData.has_completed_onboarding
        ? '/onboarding'
        : req.body.redirectTo ?? '/app';

      return res.status(200).json({ redirectTo });
    }

    console.error('API/confirm-recovery: No happy paths for this user', req);
    return res.status(400).json({ message: 'Something went terribly wrong. Try again.' });
  } catch (error) {
    console.error('API/confirm-recovery', error);
    return res.status(400).json({ message: 'Something went terribly wrong. Try again.', error });
  }
}

export default handler;
