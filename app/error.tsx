'use client';

import { useEffect } from 'react';
import { sentry } from './utils/sentry.client.config';
import type { FC } from 'react';

interface Props {
  error: Error;
  reset(): void;
}

const ErrorCatcher: FC<Props> = ({ error, reset }) => {
  useEffect(() => {
    sentry.captureException(error);
  }, [error]);
  return (
    <div>
      <p>Something went wrong and it has been reported.</p>
      <button onClick={reset}>Clear error</button>
    </div>
  );
};

export default ErrorCatcher;
