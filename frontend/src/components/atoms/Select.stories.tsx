import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Atoms/Select',
  component: Select,
  args: {
    label: 'Estado',
    options: [
      { value: 'a', label: 'Opcion A' },
      { value: 'b', label: 'Opcion B' },
      { value: 'c', label: 'Opcion C' },
    ],
    value: 'a',
  },
  argTypes: {
    onChange: { action: 'changed' },
    value: { control: 'text' },
    error: { control: 'boolean' },
    helperText: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Error: Story = {
  args: { error: true, helperText: 'Campo requerido' },
};
