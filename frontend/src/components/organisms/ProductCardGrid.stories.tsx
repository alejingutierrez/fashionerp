import type { Meta, StoryObj } from '@storybook/react';
import { ProductCardGrid, ProductCard } from './ProductCardGrid';

const sampleProducts: ProductCard[] = Array.from({ length: 8 }).map((_, i) => ({
  id: String(i + 1),
  name: `Producto ${i + 1}`,
  price: 10 + i,
  status: i % 3 === 0 ? 'out_of_stock' : i % 3 === 1 ? 'promotion' : 'available',
  src: 'https://placehold.co/40',
}));

const meta: Meta<typeof ProductCardGrid> = {
  title: 'Organisms/ProductCardGrid',
  component: ProductCardGrid,
  args: {
    products: sampleProducts,
  },
  argTypes: {
    onChange: { action: 'changed' },
    onSelect: { action: 'selected' },
  },
};
export default meta;

type Story = StoryObj<typeof ProductCardGrid>;

export const Default: Story = {};

export const Disponible: Story = {
  args: {
    products: [
      {
        id: '1',
        name: 'Disponible',
        price: 20,
        status: 'available',
        src: 'https://placehold.co/40',
      },
    ],
  },
};

export const EnPromocion: Story = {
  args: {
    products: [
      {
        id: '1',
        name: 'Promo',
        price: 15,
        status: 'promotion',
        src: 'https://placehold.co/40',
      },
    ],
  },
};

export const SinStock: Story = {
  args: {
    products: [
      {
        id: '1',
        name: 'Agotado',
        price: 20,
        status: 'out_of_stock',
        src: 'https://placehold.co/40',
      },
    ],
  },
};

export const Loading: Story = { args: { loading: true } };

export const GridDemo: Story = { args: { products: sampleProducts } };
