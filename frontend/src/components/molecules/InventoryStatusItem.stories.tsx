import type { Meta, StoryObj } from '@storybook/react';
import { InventoryStatusItem } from './InventoryStatusItem';

const meta: Meta<typeof InventoryStatusItem> = {
  title: 'Molecules/InventoryStatusItem',
  component: InventoryStatusItem,
  args: {
    name: 'Polo Azul',
    stock: 30,
    lowStockThreshold: 5,
    editable: false,
    iconName: 'info',
  },
  argTypes: {
    lowStockThreshold: { control: 'number' },
    editable: { control: 'boolean' },
    stock: { control: 'number' },
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
    onStockChange: { action: 'changed' },
  },
};
export default meta;

type Story = StoryObj<typeof InventoryStatusItem>;

export const InStock: Story = {};

export const LowStock: Story = {
  args: { stock: 4 },
};

export const OutOfStock: Story = {
  args: { stock: 0 },
};

export const Editable: Story = {
  args: { editable: true },
};

export const WithoutIcon: Story = {
  args: { iconName: undefined },
};
