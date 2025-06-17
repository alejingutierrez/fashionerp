import type { Meta, StoryObj } from '@storybook/react';
import { OrderListItem } from './OrderListItem';

const meta: Meta<typeof OrderListItem> = {
  title: 'Molecules/OrderListItem',
  component: OrderListItem,
  args: {
    orderNumber: 1001,
    date: '2025-06-12',
    customer: 'Ana G\u00F3mez',
    total: 150,
    status: 'pending',
    variant: 'full',
    iconName: 'info',
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['pending', 'shipped', 'delivered', 'cancelled'],
    },
    variant: { control: 'radio', options: ['full', 'compact'] },
    iconName: {
      control: 'select',
      options: [
        undefined,
        'search',
        'user',
        'settings',
        'menu',
        'close',
        'delete',
        'favorite',
        'info',
      ],
    },
    onClick: { action: 'clicked' },
  },
};
export default meta;

type Story = StoryObj<typeof OrderListItem>;

export const Pending: Story = {};

export const Shipped: Story = {
  args: { status: 'shipped' },
};

export const Delivered: Story = {
  args: { status: 'delivered' },
};

export const Cancelled: Story = {
  args: { status: 'cancelled' },
};

export const Compact: Story = {
  args: { variant: 'compact' },
};
