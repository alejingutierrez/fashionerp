import type { Meta, StoryObj } from '@storybook/react';
import { NumberInput } from './NumberInput';

const meta: Meta<typeof NumberInput> = {
  title: 'Atoms/NumberInput',
  component: NumberInput,
  args: {
    value: 0,
  },
  argTypes: {
    onChange: { action: 'changed' },
    value: { control: 'number' },
    disabled: { control: 'boolean' },
    helperText: { control: 'text' },
    error: { control: 'boolean' },
    min: { control: 'number' },
    max: { control: 'number' },
  },
};
export default meta;

type Story = StoryObj<typeof NumberInput>;

export const Default: Story = {};

export const WithLimits: Story = {
  args: { min: 0, max: 10 },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Error: Story = {
  args: { error: true, helperText: 'Valor inválido' },
};
