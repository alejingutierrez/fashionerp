import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Atoms/Switch',
  component: Switch,
  args: {
    checked: false,
  },
  argTypes: {
    onChange: { action: 'changed' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'info', 'default'],
    },
    size: { control: 'select', options: ['medium', 'small'] },
  },
};
export default meta;

type Story = StoryObj<typeof Switch>;

export const Off: Story = {};
export const On: Story = { args: { checked: true } };
export const Disabled: Story = { args: { disabled: true } };
export const Secondary: Story = {
  args: { color: 'secondary', checked: true },
};
export const Small: Story = {
  args: { size: 'small' },
};
