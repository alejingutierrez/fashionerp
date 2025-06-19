import type { Meta, StoryObj } from '@storybook/react';
import dayjs from 'dayjs';
import { ChipTag, Icon } from '../atoms';
import { TableRowItem } from './TableRowItem';

const meta: Meta<typeof TableRowItem> = {
  title: 'Molecules/TableRowItem',
  component: TableRowItem,
  args: {
    density: 'standard',
    selected: false,
    highlighted: false,
  },
  argTypes: {
    onAction: { action: 'action' },
    actionIcon: { control: false },
    density: { control: 'radio', options: ['standard', 'compact'] },
    selected: { control: 'boolean' },
    highlighted: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof TableRowItem>;

export const ProductRow: Story = {
  args: {
    id: 'SKU001',
    cells: [
      'SKU001',
      'Camisa Polo',
      'Ropa',
      '$49.99',
      <ChipTag key="status" label="Activo" color="success" size="small" />,
    ],
    actionIcon: <Icon name="settings" />,
  },
};

export const OrderRow: Story = {
  args: {
    id: 'O123',
    cells: [
      'O123',
      dayjs('2024-05-01').format('DD/MM/YYYY'),
      'Juan Perez',
      '$100',
      <ChipTag key="status" label="Pendiente" color="warning" size="small" />,
    ],
    actionIcon: <Icon name="info" />,
  },
};

export const Selected: Story = {
  args: {
    ...ProductRow.args,
    selected: true,
  },
};

export const Highlighted: Story = {
  args: {
    ...ProductRow.args,
    highlighted: true,
  },
};

export const Compact: Story = {
  args: {
    ...ProductRow.args,
    density: 'compact',
  },
};
