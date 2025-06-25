import type { Meta, StoryObj } from '@storybook/react';
import dayjs from 'dayjs';
import { LabeledDateField } from './LabeledDateField';

const meta: Meta<typeof LabeledDateField> = {
  title: 'Molecules/LabeledDateField',
  component: LabeledDateField,
  args: {
    label: 'Fecha',
    value: null,
  },
  argTypes: {
    onChange: { action: 'changed' },
    value: { control: 'date' },
    helperText: { control: 'text' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof LabeledDateField>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { value: dayjs() },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Error: Story = {
  args: { error: true, helperText: 'Fecha inválida' },
};
