'use client';

import { FormEvent } from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { styled } from '@stitches/react';

const Label = styled(LabelPrimitive.Root, {
  fontSize: 15,
  fontWeight: 500,
  userSelect: 'none',
});

const Flex = styled('div', { display: 'flex' });

const Input = styled('input', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 2,
});

export default function OnBoardingPage() {
  const submit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <form>
      <Flex css={{ flexDirection: 'column' }}>
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" placeholder="Jonny Appleseed" />
        <button type="submit" onClick={submit}>
          Submit
        </button>
      </Flex>
    </form>
  );
}
