'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Form, InputField } from 'app/components';
import { nopeResolver } from '@hookform/resolvers/nope';
import * as Nope from 'nope-validator';

const schema = Nope.object().shape({
  name: Nope.string().required(),
  team: Nope.string().required(),
});

interface FormData {
  name: string;
  team: string;
}

const submit: SubmitHandler<FormData> = ({ name, team }) => {
  // TODO: Submit info here...
};

export const OnBoardingForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: nopeResolver(schema),
  });

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <h3>Finish Up!</h3>
      <InputField id="name" label="Full Name" error={errors.name} {...register('name')} />
      <InputField id="team" label="Team Name" error={errors.team} {...register('team')} />
      <div className="form-group">
        <Button type="submit">Submit</Button>
      </div>
    </Form>
  );
};
