import type { Meta, StoryObj } from '@storybook/react';
import { ToggleSwitchField } from './ToggleSwitchField';

const meta: Meta<typeof ToggleSwitchField> = {
  title: 'Molecules/ToggleSwitchField',
  component: ToggleSwitchField,
  args: {
    label: 'Activo',
    checked: false,
  },
  argTypes: {
    onChange: { action: 'changed' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    labelPlacement: { control: 'radio', options: ['start', 'end'] },
    size: { control: 'select', options: ['medium', 'small'] },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'info', 'default'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof ToggleSwitchField>;

export const Default: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const LabelStart: Story = {
  args: { labelPlacement: 'start' },
};
