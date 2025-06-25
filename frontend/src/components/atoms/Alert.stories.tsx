import type { Meta, StoryObj } from '@storybook/react';
import Button from '@mui/material/Button';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Atoms/Alert',
  component: Alert,
  args: {
    severity: 'info',
    children: 'Información relevante para el usuario.',
    size: 'medium',
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
    size: {
      control: 'radio',
      options: ['small', 'medium'],
    },
    hideIcon: { control: 'boolean' },
    autoHideDuration: { control: 'number' },
    title: { control: 'text' },
    children: { control: 'text' },
    action: {
      control: false, // ReactNode, no hay un control simple
      description: 'Permite añadir acciones personalizadas (ej. botones).',
    },
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

export const Small: Story = {
  args: { size: 'small', children: 'Alerta compacta' },
};

export const WithoutIcon: Story = {
  args: { hideIcon: true, children: 'Sin icono' },
};

export const AutoHide: Story = {
  args: { onClose: () => {}, autoHideDuration: 3000, children: 'Se cierra solo' },
};

export const WithAction: Story = {
  args: {
    severity: 'warning',
    children: 'Se ha eliminado un elemento.',
    action: (
      <Button color="inherit" size="small">
        DESHACER
      </Button>
    ),
    onClose: () => {}, // Para que se muestre el botón de cierre también
  },
};
