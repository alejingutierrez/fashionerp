import type { Meta, StoryObj } from '@storybook/react';
import { NotificationItem } from './NotificationItem';

const meta: Meta<typeof NotificationItem> = {
  title: 'Molecules/NotificationItem',
  component: NotificationItem,
  args: {
    message: 'Actualización disponible',
    timestamp: 'hace 2 horas',
    type: 'info',
    read: false,
  },
  argTypes: {
    type: { control: 'select', options: ['info', 'success', 'warning', 'error'] },
    read: { control: 'boolean' },
    onDismiss: { action: 'dismissed' },
  },
};
export default meta;

type Story = StoryObj<typeof NotificationItem>;

export const Info: Story = {};

export const WarningUnread: Story = {
  args: { type: 'warning', message: 'Stock bajo en SKU123', timestamp: 'hace 5 min' },
};

export const SuccessRead: Story = {
  args: { type: 'success', message: 'Pedido #1001 completado', read: true },
};

export const WithDismiss: Story = {
  args: { onDismiss: () => {} },
};
