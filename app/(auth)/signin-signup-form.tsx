'use client';

import { nopeResolver } from '@hookform/resolvers/nope';
import { Alert, Button, Form, InputField, Link } from 'app/components';
import { post } from 'app/utils/request';
import { useRouter } from 'next/navigation';
import * as Nope from 'nope-validator';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import type { Dispatch, FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';

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
    try {
      setError(undefined);
      const { ok, statusText, res } = await post('/api/auth/signin', {
        email,
        password,
      });
      if (!ok) {
        setError(res.error ? res.message : statusText);
      } else if (res.redirectTo) {
        push(ok && res.redirectTo);
      } else if (ok && !res.redirectTo) {
        push('/app');
      } else {
        throw Error('Signed in with nowhere to redirect to.');
      }
    } catch (error) {
      setError('Something went wrong and it has been reported. Try again.');
      throw error;
    }
  },
  async signup({ email, password }) {
    try {
      setError(undefined);
      const { res, ok, statusText } = await post('/api/auth/signup', {
        email,
        password,
        redirectTo: `/confirm-signup`,
      });

      if (!ok) {
        setError(res.error ? res.message : statusText);
      } else {
        setMessage(res.message);
      }
      if (res.redirectTo) {
        setTimeout(() => {
          push(res.redirectTo);
        }, 3000);
      }
    } catch (error) {
      setError('Something went wrong and it has been reported. Try again.');
      throw error;
    }
  },
});

interface Props {
  type: 'signin' | 'signup';
}

export const SigninSignupForm: FC<Props> = ({ type }) => {
  const [error, setError] = useState<string>();
  const [message, setMessage] = useState<string>();
  const { push } = useRouter();
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
        autoComplete="email"
        error={errors.email}
        {...register('email')}
      />
      <InputField
        label="Password"
        id="password"
        type="password"
        autoComplete={type === 'signin' ? 'current-password' : 'new-password'}
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
