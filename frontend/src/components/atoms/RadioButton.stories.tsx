import type { Meta, StoryObj } from '@storybook/react';
import { RadioButton } from './RadioButton';

const meta: Meta<typeof RadioButton> = {
  title: 'Atoms/RadioButton',
  component: RadioButton,
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

type Story = StoryObj<typeof RadioButton>;

export const Unchecked: Story = {};
export const Checked: Story = { args: { checked: true } };
export const Disabled: Story = { args: { disabled: true } };
export const Secondary: Story = {
  args: { color: 'secondary', checked: true },
};
export const Small: Story = { args: { size: 'small' } };
