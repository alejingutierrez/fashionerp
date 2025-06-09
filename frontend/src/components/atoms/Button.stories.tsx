import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  args: {
    children: 'Click me',
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};
export const Disabled: Story = {
  args: { disabled: true, children: "Can't click" },
};
