import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  if (req.nextUrl.pathname.startsWith('/api')) {
    console.info(req, res);
    return res;
  }

  const supabase = createMiddlewareSupabaseClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return res;
  }

  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = '/signin';
  redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname);
  return NextResponse.redirect(redirectUrl);
};

export default middleware;

export const config = {
  matcher: ['/app/:path*', '/api/:path*'],
};
