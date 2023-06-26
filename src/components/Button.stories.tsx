import { type Meta, type StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import Button from './Button';

const meta: Meta<typeof Button> = {
  //   title: 'components/Button',
  component: Button,
};
export default meta;

type Story = StoryObj<typeof Button>;

const ButtonWithHooks = () => {
  const [value, setValue] = useState('Secondary');
  const [isPrimary, setIsPrimary] = useState(false);

  const handleOnChange = () => {
    if (!isPrimary) {
      setIsPrimary(true);
      setValue('Primary');
    }
  };
  return <Button intent="primary" label={value} />;
};

export const Primary: Story = {
  args: {
    intent: 'primary',
    label: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    intent: 'secondary',
    label: 'Secondary Button',
  },
};
