import { supabase } from '../../app/supabase';
import type { NextApiRequest, NextApiResponse } from 'next';

const didNotCompleteOnboarding = async (userId: string) => {
  const { error } = await supabase
    .from('profiles')
    .update({ has_completed_onboarding: false })
    .eq('id', userId);
  return error;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'PATCH') {
      return res.status(404).send({ message: 'Not found' });
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) {
      return res.status(400).send({ message: error.message, error });
    }

    if (!user) {
      return res.status(404).send({ message: 'You must be logged in first.' });
    }

    // Add user name to profile
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ full_name: req.body.name, has_completed_onboarding: true })
      .eq('id', user.id);

    if (profileError) {
      await didNotCompleteOnboarding(user.id);
      return res.status(400).send({ message: profileError.message, profileError });
    }

    // Create team for user
    const { data: teamData, error: teamError } = await supabase
      .from('teams')
      .insert([{ name: req.body.team }])
      .select('id')
      .single();

    if (teamError) {
      await didNotCompleteOnboarding(user.id);
      return res.status(400).send({ message: teamError.message, teamError });
    }

    // Create relationship between team and user
    const { error: relationError } = await supabase
      .from('users_teams')
      .insert({ team_id: teamData.id, user_id: user.id });

    if (relationError) {
      await didNotCompleteOnboarding(user.id);
      return res.status(400).send({ message: relationError.message, relationError });
    }

    res.redirect('/app');
  } catch (e) {
    res.status(400).send({ message: 'Something went terribly wrong. Try again.' });
    throw e;
  }
}

export default handler;
