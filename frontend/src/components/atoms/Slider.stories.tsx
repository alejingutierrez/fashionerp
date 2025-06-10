import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Atoms/Slider',
  component: Slider,
  args: {
    value: 30,
    min: 0,
    max: 100,
    step: 1,
  },
  argTypes: {
    onChange: { action: 'changed' },
    value: { control: 'object' },
    marks: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof Slider>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Range: Story = {
  args: { value: [20, 80] },
};

export const WithMarks: Story = {
  args: { marks: true },
};
