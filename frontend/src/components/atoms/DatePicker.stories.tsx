import type { Meta, StoryObj } from '@storybook/react';
import dayjs from 'dayjs';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Atoms/DatePicker',
  component: DatePicker,
  args: {
    label: 'Fecha',
    value: null,
  },
  argTypes: {
    onChange: { action: 'changed' },
    value: { control: 'date' },
    disabled: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { value: dayjs() },
};

export const Disabled: Story = {
  args: { disabled: true },
};
