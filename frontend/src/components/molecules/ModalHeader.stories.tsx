import type { Meta, StoryObj } from '@storybook/react';
import { ModalHeader } from './ModalHeader';

const meta: Meta<typeof ModalHeader> = {
  title: 'Molecules/ModalHeader',
  component: ModalHeader,
  args: {
    title: 'Editar Producto',
    hideCloseButton: false,
    align: 'left',
    divider: false,
  },
  argTypes: {
    title: { control: 'text' },
    hideCloseButton: { control: 'boolean' },
    align: { control: 'radio', options: ['left', 'center'] },
    divider: { control: 'boolean' },
    onClose: { action: 'close' },
  },
};
export default meta;

type Story = StoryObj<typeof ModalHeader>;

export const Default: Story = {};

export const WithoutClose: Story = {
  args: { hideCloseButton: true },
};

export const CenteredTitle: Story = {
  args: { align: 'center' },
};

export const WithDivider: Story = {
  args: { divider: true },
};

export const LongTitle: Story = {
  args: {
    title:
      'Este es un título de modal realmente muy largo para probar el comportamiento de envoltura o truncado',
  },
};
