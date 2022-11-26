'use client';

import { nopeResolver } from '@hookform/resolvers/nope';
import { Alert, Button, Form, InputField, Link } from 'app/components';
import { baseUrl } from 'app/utils/client-constants';
import { post } from 'app/utils/request';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { useRouter } from 'next/navigation';
import * as Nope from 'nope-validator';
import type { Dispatch } from 'react';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

interface FormData {
  password: string;
}

const schema = Nope.object().shape({
  password: Nope.string().atLeast(8).required(),
});

type SetString = Dispatch<string | undefined>;

const submit =
  (setError: SetString, push: AppRouterInstance['push']): SubmitHandler<FormData> =>
  async ({ password }) => {
    try {
      setError(undefined);
      const { ok, res, statusText } = await post('/api/auth/confirm-recovery', {
        password,
        redirectTo: `${baseUrl}/app`,
      });
      if (!ok) {
        setError(res.error ? res.message : statusText);
      } else if (ok && res.redirectTo) {
        push(res.redirectTo);
      } else if (ok && !res.redirectTo) {
        push('/app');
      } else {
        throw Error('Signed in with nowhere to redirect to.');
      }
    } catch (error) {
      setError('Something went wrong and it has been reported. Try again.');
      throw error;
    }
  };

export function ConfirmRecoveryForm() {
  const [error, setError] = useState<string>();
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: nopeResolver(schema),
  });
  return (
    <Form onSubmit={handleSubmit(submit(setError, push))}>
      <h3>Update your password</h3>
      <InputField
        label="New password"
        id="password"
        type="password"
        autoComplete="password"
        error={errors.password}
        {...register('password')}
      />
      {error && <Alert type="error">{error}</Alert>}
      <div className="form-group">
        <Button type="submit">Submit</Button>
      </div>
      <div className="form-group">
        <Link href="/signin">Sign in?</Link>
      </div>
    </Form>
  );
}
