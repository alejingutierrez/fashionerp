import type { Meta, StoryObj } from '@storybook/react';
import dayjs from 'dayjs';
import { DateRangePicker } from './DateRangePicker';

const meta: Meta<typeof DateRangePicker> = {
  title: 'Molecules/DateRangePicker',
  component: DateRangePicker,
  args: {
    start: null,
    end: null,
  },
  argTypes: {
    onChange: { action: 'changed' },
    start: { control: 'date' },
    end: { control: 'date' },
    disabled: { control: 'boolean' },
    startLabel: { control: 'text' },
    endLabel: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof DateRangePicker>;

export const Default: Story = {};

export const PredefinedRange: Story = {
  args: {
    start: dayjs().startOf('month'),
    end: dayjs().startOf('month').add(14, 'day'),
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const WithLabels: Story = {
  args: { startLabel: 'Desde', endLabel: 'Hasta' },
};

export const ErrorExample: Story = {
  args: {
    start: dayjs('2025-01-10'),
    end: dayjs('2025-01-05'),
  },
};
