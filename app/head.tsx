'use client';

import { useEffect } from 'react';
import { createSentry } from './utils/sentry.client.config';

export default function Head() {
  useEffect(() => {
    createSentry();
  });
  return (
    <>
      <title>Iniitist</title>
    </>
  );
}
