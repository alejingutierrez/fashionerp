import type { Meta, StoryObj } from '@storybook/react';
import dayjs from 'dayjs';
import { DualDateRangeField } from './DualDateRangeField';

const meta: Meta<typeof DualDateRangeField> = {
  title: 'Molecules/DualDateRangeField',
  component: DualDateRangeField,
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

type Story = StoryObj<typeof DualDateRangeField>;

export const RangoNormal: Story = {
  args: {
    start: dayjs().startOf('month'),
    end: dayjs().startOf('month').add(7, 'day'),
  },
};

export const FinAntesDeInicio: Story = {
  args: {
    start: dayjs('2025-01-10'),
    end: dayjs('2025-01-05'),
  },
};

export const SoloInicio: Story = {
  args: {
    start: dayjs(),
    end: null,
  },
};
