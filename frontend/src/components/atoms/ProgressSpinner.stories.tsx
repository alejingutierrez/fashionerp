import type { Meta, StoryObj } from '@storybook/react';
import { ProgressSpinner } from './ProgressSpinner';

const meta: Meta<typeof ProgressSpinner> = {
  title: 'Atoms/ProgressSpinner',
  component: ProgressSpinner,
  args: {
    variant: 'indeterminate',
    color: 'primary',
  },
  argTypes: {
    variant: { control: 'select', options: ['indeterminate', 'determinate'] },
    value: { control: 'number' },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'inherit', 'error', 'info', 'warning'],
    },
    size: { control: 'number' },
  },
};
export default meta;

type Story = StoryObj<typeof ProgressSpinner>;

export const Indeterminate: Story = {};

export const Determinate: Story = {
  args: { variant: 'determinate', value: 60 },
};
