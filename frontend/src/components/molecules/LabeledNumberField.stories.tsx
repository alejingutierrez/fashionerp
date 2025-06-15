import type { Meta, StoryObj } from '@storybook/react';
import { LabeledNumberField } from './LabeledNumberField';

const meta: Meta<typeof LabeledNumberField> = {
  title: 'Molecules/LabeledNumberField',
  component: LabeledNumberField,
  args: {
    label: 'Cantidad',
    value: 0,
  },
  argTypes: {
    onChange: { action: 'changed' },
    value: { control: 'number' },
    helperText: { control: 'text' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    min: { control: 'number' },
    max: { control: 'number' },
    autoFocus: { control: 'boolean' },
    size: { control: 'radio', options: ['small', 'medium'] },
  },
};
export default meta;

type Story = StoryObj<typeof LabeledNumberField>;

export const Default: Story = {};

export const WithLimits: Story = {
  args: { min: 0, max: 10, value: 5 },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Error: Story = {
  args: { error: true, helperText: 'Fuera de rango' },
};
