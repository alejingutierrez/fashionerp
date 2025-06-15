import type { Meta, StoryObj } from '@storybook/react';
import { CurrencyField } from './CurrencyField';

const meta: Meta<typeof CurrencyField> = {
  title: 'Atoms/CurrencyField',
  component: CurrencyField,
  args: {
    value: 0,
    currency: 'USD',
  },
  argTypes: {
    onChange: { action: 'changed' },
    value: { control: 'number' },
    currency: { control: 'text' },
    disabled: { control: 'boolean' },
    helperText: { control: 'text' },
    error: { control: 'boolean' },
    autoFocus: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof CurrencyField>;

export const Default: Story = {};

export const WithEuro: Story = {
  args: { currency: 'EUR', value: 10.5 },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Error: Story = {
  args: { error: true, helperText: 'Valor inv\u00E1lido' },
};
