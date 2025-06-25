import type { Meta, StoryObj } from '@storybook/react';
import { DismissibleAlert } from './DismissibleAlert';

const meta: Meta<typeof DismissibleAlert> = {
  title: 'Molecules/DismissibleAlert',
  component: DismissibleAlert,
  args: {
    severity: 'success',
    children: '¡Éxito! Producto guardado',
  },
  argTypes: {
    severity: { control: 'select', options: ['error', 'warning', 'info', 'success'] },
    defaultOpen: { control: 'boolean' },
    onClose: { action: 'closed' },
    children: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof DismissibleAlert>;

export const Success: Story = {};

export const Error: Story = {
  args: { severity: 'error', children: 'Ha ocurrido un error' },
};

export const Warning: Story = {
  args: { severity: 'warning', children: 'Advertencia importante' },
};

export const Info: Story = {
  args: { severity: 'info', children: 'Información para el usuario' },
};
