'use client';

import { useEffect, useRef } from 'react';
import { initDatadog } from './utils/datadog';

const env = process.env.NEXT_PUBLIC_VERCEL_ENV ?? 'development';
const version = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? 'local';

export default function Head() {
  const datadog = useRef(initDatadog(env, version));
  useEffect(() => {
    datadog.current();
  }, []);

  return (
    <>
      <title>Initist</title>
      {env === 'production' && <script async src="/va/script.js"></script>}
    </>
  );
}
