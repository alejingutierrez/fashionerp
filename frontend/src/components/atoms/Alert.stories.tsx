import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Atoms/Alert',
  component: Alert,
  args: {
    severity: 'info',
    children: 'Información relevante para el usuario.',
  },
  argTypes: {
    onClose: { action: 'closed' },
    severity: {
      control: 'select',
      options: ['error', 'warning', 'info', 'success'],
    },
    variant: {
      control: 'select',
      options: ['standard', 'outlined', 'filled'],
    },
    title: { control: 'text' },
    children: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof Alert>;

export const Info: Story = {};
export const Success: Story = {
  args: { severity: 'success', children: 'Operación exitosa.' },
};
export const Warning: Story = {
  args: { severity: 'warning', children: 'Atención: revise los datos.' },
};
export const Error: Story = {
  args: { severity: 'error', children: 'Ha ocurrido un error.' },
};
export const Closable: Story = {
  args: {
    severity: 'info',
    onClose: () => {},
    children: 'Puede descartar esta alerta.',
  },
};
export const WithTitle: Story = {
  args: {
    severity: 'error',
    title: 'Error',
    children: 'Ocurrió un problema al guardar.',
  },
};
export const Filled: Story = {
  args: { severity: 'success', variant: 'filled', children: 'Acción completada.' },
};
