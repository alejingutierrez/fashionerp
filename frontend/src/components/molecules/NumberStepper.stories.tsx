import type { Meta, StoryObj } from '@storybook/react';
import { NumberStepper } from './NumberStepper';

const meta: Meta<typeof NumberStepper> = {
  title: 'Molecules/NumberStepper',
  component: NumberStepper,
  args: {
    defaultValue: 0,
  },
  argTypes: {
    onChange: { action: 'changed' },
    value: { control: 'number' },
    defaultValue: { control: 'number' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
    size: { control: 'radio', options: ['small', 'medium'] },
  },
};
export default meta;

type Story = StoryObj<typeof NumberStepper>;

export const Default: Story = {};

export const WithLimits: Story = {
  args: { min: 0, max: 5 },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const StepTen: Story = {
  args: { step: 10 },
};
