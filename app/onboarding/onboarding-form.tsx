'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Form, InputField } from 'components';

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
  } = useForm<FormData>();

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <h3>Finish Up!</h3>
      <InputField
        id="name"
        label="Full Name"
        error={errors.name}
        errorMessage="Full name field is required."
        {...register('name', { required: true })}
      />
      <InputField
        id="team"
        label="Team Name"
        error={errors.team}
        errorMessage="Team field is required."
        {...register('team', { required: true })}
      />
      <div className="form-group">
        <Button type="submit">Submit</Button>
      </div>
    </Form>
  );
};
