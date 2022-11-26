'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { nopeResolver } from '@hookform/resolvers/nope/dist/nope';
import * as Nope from 'nope-validator';
import { Alert, Button, Form, InputField, Link } from 'app/components';
import { post } from 'app/utils/request';
import type { Dispatch } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { baseUrl } from 'app/utils/client-constants';

interface FormData {
  email: string;
}

const schema = Nope.object().shape({
  email: Nope.string().email().required(),
});

type SetText = Dispatch<string | undefined>;

const submit =
  (setError: SetText, setMessage: SetText): SubmitHandler<FormData> =>
  async ({ email }) => {
    setError(undefined);
    const { ok, statusText, res } = await post('/api/auth/recover', {
      email,
      redirectTo: `${baseUrl}/confirm-recovery`,
    });
    if (!ok) {
      setError(res.error ? res.message : statusText);
    } else {
      setMessage(res.message);
    }
  };

export const RecoverForm = () => {
  const [error, setError] = useState<string>();
  const [message, setMessage] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: nopeResolver(schema),
  });

  return (
    <Form onSubmit={handleSubmit(submit(setError, setMessage))}>
      <h3>Reset your password</h3>
      <InputField
        label="Email"
        id="email"
        type="email"
        autoComplete="email"
        error={errors.email}
        {...register('email')}
      />
      {error && <Alert type="error">{error}</Alert>}
      {message && <Alert type="success">{message}</Alert>}
      <div className="form-group">
        <Button disabled={!!message} type="submit">
          Submit
        </Button>
      </div>
      <div className="form-group">
        <Link href="/signin">Sign in?</Link>
      </div>
    </Form>
  );
};
