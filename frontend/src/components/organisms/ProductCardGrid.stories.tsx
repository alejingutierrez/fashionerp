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
    onPriceChange: { action: 'price changed' },
    onSelect: { action: 'selected' },
  },
};
export default meta;

type Story = StoryObj<typeof ProductCardGrid>;

export const Default: Story = {};

export const MobileTwoColumns: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};

export const OutOfStock: Story = {
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
