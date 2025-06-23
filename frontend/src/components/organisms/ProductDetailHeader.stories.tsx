import type { Meta, StoryObj } from '@storybook/react';
import { rest } from 'msw';
import { ProductDetailHeader } from './ProductDetailHeader';

const meta: Meta<typeof ProductDetailHeader> = {
  title: 'Organisms/ProductDetailHeader',
  component: ProductDetailHeader,
  parameters: {
    msw: {
      handlers: [
        rest.patch('/api/v1/products/1', (_req, res, ctx) => res(ctx.status(200))),
      ],
    },
  },
};
export default meta;

type Story = StoryObj<typeof ProductDetailHeader>;

export const Activo: Story = {
  args: {
    name: 'Producto Demo',
    src: 'https://placehold.co/200',
    defaultActive: true,
    onStatusChange: async () => {},
    onNameSave: async () => {},
  },
};

export const Archivado: Story = {
  args: {
    name: 'Producto Demo',
    src: 'https://placehold.co/200',
    defaultActive: false,
  },
};

export const ErrorGuardando: Story = {
  parameters: {
    msw: {
      handlers: [
        rest.patch('/api/v1/products/1', (_req, res, ctx) => res(ctx.status(500))),
      ],
    },
  },
  args: {
    name: 'Producto Demo',
    src: 'https://placehold.co/200',
    defaultActive: true,
    onStatusChange: async () => {
      throw new Error('Error');
    },
  },
};
