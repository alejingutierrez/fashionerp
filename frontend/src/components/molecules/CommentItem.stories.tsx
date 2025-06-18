import type { Meta, StoryObj } from '@storybook/react';
import { CommentItem } from './CommentItem';

const meta: Meta<typeof CommentItem> = {
  title: 'Molecules/CommentItem',
  component: CommentItem,
  args: {
    name: 'Ana Gómez',
    text: 'Actualicé el precio del producto.',
    timestamp: 'hace 3 horas',
    avatarSrc: 'https://i.pravatar.cc/40',
    system: false,
  },
  argTypes: {
    system: { control: 'boolean' },
    compact: { control: 'boolean' },
    onEdit: { action: 'edit' },
    onDelete: { action: 'delete' },
  },
};
export default meta;

type Story = StoryObj<typeof CommentItem>;

export const Usuario: Story = {};

export const Sistema: Story = {
  args: {
    system: true,
    avatarSrc: undefined,
    name: 'Sistema',
    text: 'Pedido aprobado automáticamente',
    timestamp: 'hace 1 día',
  },
};

export const Compacto: Story = {
  args: { compact: true },
};

export const ConAcciones: Story = {
  args: {
    onEdit: () => {},
    onDelete: () => {},
  },
};
