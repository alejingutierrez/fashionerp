import type { Meta, StoryObj } from '@storybook/react';
import { SnackbarAlert } from './SnackbarAlert';

const meta: Meta<typeof SnackbarAlert> = {
  title: 'Molecules/SnackbarAlert',
  component: SnackbarAlert,
  args: {
    open: true,
    message: 'Cambios guardados',
    severity: 'success',
    sticky: false,
  },
  argTypes: {
    severity: { control: 'select', options: ['success', 'info', 'warning', 'error'] },
    open: { control: 'boolean' },
    sticky: { control: 'boolean' },
    onClose: { action: 'closed' },
  },
};
export default meta;

type Story = StoryObj<typeof SnackbarAlert>;

export const Success: Story = {};

export const Info: Story = {
  args: { severity: 'info', message: 'Información disponible' },
};

export const Warning: Story = {
  args: { severity: 'warning', message: 'Revisa los campos' },
};

export const Error: Story = {
  args: { severity: 'error', message: 'Error al guardar' },
};

export const StickyDemo: Story = {
  args: { sticky: true },
};
