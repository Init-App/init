'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Alert, Button, Form, InputField } from 'app/components';
import { nopeResolver } from '@hookform/resolvers/nope';
import * as Nope from 'nope-validator';
import { post } from 'app/utils/request';
import { useState } from 'react';
import type { Dispatch } from 'react';

const schema = Nope.object().shape({
  name: Nope.string().required(),
  team: Nope.string().required(),
});

interface FormData {
  name: string;
  team: string;
}

const submit =
  (setError: Dispatch<string | undefined>): SubmitHandler<FormData> =>
  async ({ name, team }) => {
    setError(undefined);
    const { ok, res, statusText } = await post('/api/onboarding', { name, team });
    if (!ok) {
      setError(res.error ? res.message : statusText);
    }
  };

export const OnBoardingForm = () => {
  const [error, setError] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: nopeResolver(schema),
  });

  return (
    <Form onSubmit={handleSubmit(submit(setError))}>
      <h3>Finish Up!</h3>
      <InputField id="name" label="Full Name" error={errors.name} {...register('name')} />
      <InputField id="team" label="Team Name" error={errors.team} {...register('team')} />
      {error && <Alert type="error">{error}</Alert>}
      <div className="form-group">
        <Button type="submit">Submit</Button>
      </div>
    </Form>
  );
};
