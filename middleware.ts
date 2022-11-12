import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { sentry } from 'app/utils/sentry.server.config';

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  if (req.headers.has('X-Trace-ID')) {
    sentry.configureScope((scope) => {
      scope.setTag('trace_id', req.headers.get('X-Trace-ID'));
    });
  }
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

export const config = {
  matcher: ['/app/:path*', '/api/:path*'],
};
