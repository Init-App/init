'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Button, Form, InputField, Alert } from 'components';
import { supabase } from '../supabase';

import type { Dispatch, FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import type { AuthError, Session, User } from '@supabase/gotrue-js';

interface FormData {
  email: string;
  password: string;
}

type ActionType = Record<Props['type'], SubmitHandler<FormData>>;

const title = {
  signin: 'Sign in!',
  signup: 'Sign up!',
};

const isError = (error: AuthError | null): error is AuthError => !!error?.message;
const isSession = (session: Session | null): session is Session => !!session?.access_token;
const isUser = (user: User | null): user is User => !!user?.id;

const action = (
  setError: Dispatch<string | undefined>,
  push: AppRouterInstance['push'],
): ActionType => ({
  signin: async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (isError(error)) {
      setError(error?.message);
    } else if (isSession(data.session) && isUser(data.user)) {
      await supabase.auth.setSession(data.session);
      push('/app');
    } else {
      setError('Something went terribly wrong. Try again.');
      throw new Error(`Signin failed: ${JSON.stringify({ data, error })}`);
    }
  },
  signup: async ({ email, password }) => {},
});

interface Props {
  type: 'signin' | 'signup';
}

export const SigninSignupForm: FC<Props> = ({ type }) => {
  const { push } = useRouter();
  const [error, setError] = useState<string>();
  const submit = action(setError, push);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  return (
    <Form onSubmit={handleSubmit(submit[type])}>
      <h3>{title[type]}</h3>
      <InputField
        label="Email"
        id="email"
        type="email"
        error={errors.email}
        errorMessage="You must enter an email."
        {...register('email', { required: true })}
      />
      <InputField
        label="Password"
        id="password"
        type="password"
        error={errors.password}
        errorMessage="You must enter a password."
        {...register('password', { required: true })}
      />
      {error && <Alert type="error">{error}</Alert>}
      <div className="form-group">
        <Button type="submit">Submit</Button>
      </div>
    </Form>
  );
};
