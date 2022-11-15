'use client';

import * as Sentry from '@sentry/browser';
import type { FC } from 'react';
import { useEffect } from 'react';

interface Props {
  error: Error;
  reset(): void;
}

const ErrorCatcher: FC<Props> = ({ error, reset }) => {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);
  return (
    <div>
      <p>Something went wrong and it has been reported.</p>
      <button onClick={reset}>Clear error</button>
    </div>
  );
};

export default ErrorCatcher;
