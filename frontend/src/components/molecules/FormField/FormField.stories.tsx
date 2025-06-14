import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './FormField';

const meta: Meta<typeof FormField> = {
  title: 'Molecules/FormField',
  component: FormField,
  args: {
    label: 'Nombre',
    placeholder: 'Ingresa tu nombre',
  },
};

export default meta;

type Story = StoryObj<typeof FormField>;

export const Default: Story = {};

export const Error: Story = {
  args: {
    error: true,
    errorMessage: 'Campo requerido',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Texto',
  },
};
