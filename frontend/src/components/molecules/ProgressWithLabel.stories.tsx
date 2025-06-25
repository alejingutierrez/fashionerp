import type { Meta, StoryObj } from '@storybook/react';
import { ProgressWithLabel } from './ProgressWithLabel';

const meta: Meta<typeof ProgressWithLabel> = {
  title: 'Molecules/ProgressWithLabel',
  component: ProgressWithLabel,
  args: {
    progress: undefined,
    orientation: 'horizontal',
    size: 'small',
    color: 'primary',
  },
  argTypes: {
    progress: { control: 'number' },
    label: { control: 'text' },
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
    size: { control: 'select', options: ['small', 'large'] },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'inherit', 'error', 'info', 'warning'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof ProgressWithLabel>;

export const Indeterminate: Story = {};

export const Determinate: Story = {
  args: { progress: 50 },
};

export const Vertical: Story = {
  args: { orientation: 'vertical', size: 'large' },
};
