import type { Meta, StoryObj } from '@storybook/react';
import { LabeledCurrencyField } from './LabeledCurrencyField';

const meta: Meta<typeof LabeledCurrencyField> = {
  title: 'Molecules/LabeledCurrencyField',
  component: LabeledCurrencyField,
  args: {
    label: 'Precio',
    value: 0,
    currency: 'USD',
  },
  argTypes: {
    onChange: { action: 'changed' },
    value: { control: 'number' },
    currency: { control: 'text' },
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

type Story = StoryObj<typeof LabeledCurrencyField>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { value: 123.45 },
};

export const Euro: Story = {
  args: { currency: 'EUR', value: 40 },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Error: Story = {
  args: { error: true, helperText: 'Fuera de rango' },
};
