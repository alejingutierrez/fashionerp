import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from './TextField';

const meta: Meta<typeof TextField> = {
  title: 'Atoms/TextField',
  component: TextField,
  args: {
    label: 'Nombre',
  },
  argTypes: {
    onChange: { action: 'changed' },
    value: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    autoFocus: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof TextField>;

export const Default: Story = {};

export const Filled: Story = {
  args: { value: 'Juan' },
};

export const Focused: Story = {
  args: { autoFocus: true },
};

export const Error: Story = {
  args: { error: true, helperText: 'Campo obligatorio' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
