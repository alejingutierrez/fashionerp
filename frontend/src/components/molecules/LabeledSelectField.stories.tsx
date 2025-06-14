import type { Meta, StoryObj } from '@storybook/react';
import { LabeledSelectField } from './LabeledSelectField';

const meta: Meta<typeof LabeledSelectField> = {
  title: 'Molecules/LabeledSelectField',
  component: LabeledSelectField,
  args: {
    label: 'Estado',
    options: [
      { value: 'pendiente', label: 'Pendiente' },
      { value: 'enviado', label: 'Enviado' },
      { value: 'entregado', label: 'Entregado' },
    ],
    value: 'pendiente',
  },
  argTypes: {
    onChange: { action: 'changed' },
    value: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: { control: 'radio', options: ['small', 'medium'] },
  },
};
export default meta;

type Story = StoryObj<typeof LabeledSelectField>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { value: 'enviado' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Error: Story = {
  args: { error: true, helperText: 'Campo requerido' },
};

export const ManyOptions: Story = {
  args: {
    options: Array.from({ length: 20 }, (_, i) => ({
      value: `opt${i}`,
      label: `Opción ${i}`,
    })),
  },
};
