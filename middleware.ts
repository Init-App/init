import {
  createMiddlewareSupabaseClient,
  Session,
  SupabaseClient,
} from '@supabase/auth-helpers-nextjs';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { Database } from 'types/database.types';

const introPaths = ['/signin', '/signup', '/recover', '/confirm-signup'];
const onboardingPaths = ['/onboarding'];
const appPaths = ['/app'];

const isPath = (paths: string[]) => (path: string) => paths.some((p) => path.startsWith(p));

const isIntroPath = (path: string) => isPath(introPaths)(path);
const isOnboardingPath = (path: string) => isPath(onboardingPaths)(path);
const isAppPath = (path: string) => isPath(appPaths)(path);

const hasCompletedOnboarding = async (supabase: SupabaseClient<Database>, session: Session) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', session.user.id)
    .single();

  return { isComplete: data?.has_completed_onboarding, error };
};

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareSupabaseClient<Database>({ req, res });
  const requestedPath = req.nextUrl.pathname;
  const redirectUrl = req.nextUrl.clone();
  const isIntro = isIntroPath(requestedPath);
  const isOnboarding = isOnboardingPath(requestedPath);
  const isApp = isAppPath(requestedPath);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session && (isApp || isOnboarding)) {
    return NextResponse.redirect('/signin');
  } else if (session) {
    let isComplete, onBoardingError;
    switch (true) {
      case isApp:
        ({ isComplete, error: onBoardingError } = await hasCompletedOnboarding(supabase, session));
        if (onBoardingError) {
          return new NextResponse(
            JSON.stringify({ message: 'Something went terribly wrong.', error: onBoardingError }),
            { url: '/error', status: 400, headers: { 'content-type': 'application/json' } },
          );
        }
        if (isComplete) {
          return NextResponse.redirect(redirectUrl);
        }
        return NextResponse.redirect('/onboarding');
      case isIntro:
        return NextResponse.redirect('/app');
      case isOnboarding:
        ({ isComplete, error: onBoardingError } = await hasCompletedOnboarding(supabase, session));
        if (onBoardingError) {
          return new NextResponse(
            JSON.stringify({ message: 'Something went terribly wrong.', error: onBoardingError }),
            { url: '/error', status: 400, headers: { 'content-type': 'application/json' } },
          );
        }
        if (isComplete) {
          return NextResponse.redirect('/app');
        }
        return NextResponse.redirect(redirectUrl);
      default:
        return NextResponse.redirect('/');
    }
  }

  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico).*)'],
};
