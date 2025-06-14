import type { Meta, StoryObj } from '@storybook/react';
import { LabeledTextField } from './LabeledTextField';

const meta: Meta<typeof LabeledTextField> = {
  title: 'Molecules/LabeledTextField',
  component: LabeledTextField,
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
    size: { control: 'radio', options: ['small', 'medium'] },
  },
};
export default meta;

type Story = StoryObj<typeof LabeledTextField>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { value: 'Ejemplo' },
};

export const Disabled: Story = {
  args: { disabled: true, value: 'Texto' },
};

export const Error: Story = {
  args: { error: true, helperText: 'Campo requerido' },
};

export const Small: Story = {
  args: { size: 'small' },
};
