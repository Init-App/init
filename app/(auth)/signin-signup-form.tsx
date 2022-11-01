'use client';

import { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { nopeResolver } from '@hookform/resolvers/nope';
import * as Nope from 'nope-validator';

import { Button, Form, InputField, Alert, Link } from 'components';

import type { Dispatch, FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { post } from 'utils/request';

interface FormData {
  email: string;
  password: string;
}

type ActionType = Record<Props['type'], SubmitHandler<FormData>>;

const title = {
  signin: 'Sign in!',
  signup: 'Sign up!',
};

const link = {
  signup: {
    path: '/signin',
    text: 'Already have an account?',
  },
  signin: {
    path: '/signup',
    text: 'Need to sign up?',
  },
};

const schema = Nope.object().shape({
  email: Nope.string().email().required(),
  password: Nope.string().min(6, 'Password must be at 6 characters.').required(),
});

const action = (
  setError: Dispatch<string | undefined>,
  setMessage: Dispatch<string | undefined>,
  push: AppRouterInstance['push'],
): ActionType => ({
  async signin({ email, password }) {
    setError(undefined);
    const { ok, statusText, res } = await post('/api/auth/signin', { email, password });

    if (!ok) {
      setError(res.error ? res.message : statusText);
    }
  },
  async signup({ email, password }) {
    setError(undefined);
    const { res, ok, statusText } = await post('/api/auth/signup', { email, password });

    if (!ok) {
      setError(res.error ? res.message : statusText);
    } else {
      setMessage(res.message);
    }
  },
});

interface Props {
  type: 'signin' | 'signup';
}

export const SigninSignupForm: FC<Props> = ({ type }) => {
  const { push } = useRouter();
  const [error, setError] = useState<string>();
  const [message, setMessage] = useState<string>();
  const submit = action(setError, setMessage, push);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: nopeResolver(schema),
  });

  return (
    <Form onSubmit={handleSubmit(submit[type])}>
      <h3>{title[type]}</h3>
      <InputField
        label="Email"
        id="email"
        type="email"
        error={errors.email}
        {...register('email')}
      />
      <InputField
        label="Password"
        id="password"
        type="password"
        error={errors.password}
        {...register('password')}
      />
      {error && <Alert type="error">{error}</Alert>}
      {message && <Alert type="success">{message}</Alert>}
      <div className="form-group">
        <Button disabled={!!message} type="submit">
          Submit
        </Button>
      </div>
      <div className="form-group">
        <Link href={link[type].path}>{link[type].text}</Link>
      </div>
      <div className="form-group helper-text">
        <Link href="/recover">Forgot password?</Link>
      </div>
    </Form>
  );
};
