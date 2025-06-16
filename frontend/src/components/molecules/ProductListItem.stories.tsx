import type { Meta, StoryObj } from '@storybook/react';
import { ProductListItem } from './ProductListItem';

const meta: Meta<typeof ProductListItem> = {
  title: 'Molecules/ProductListItem',
  component: ProductListItem,
  args: {
    name: 'Camisa Polo',
    price: 49.99,
    src: 'https://placehold.co/40',
    status: 'available',
    size: 'medium',
  },
  argTypes: {
    status: { control: 'select', options: ['available', 'out_of_stock', 'promotion'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    src: { control: 'text' },
    name: { control: 'text' },
    price: { control: 'number' },
    selected: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof ProductListItem>;

export const Available: Story = {};

export const OutOfStock: Story = {
  args: { status: 'out_of_stock' },
};

export const Promotion: Story = {
  args: { status: 'promotion' },
};

export const Selected: Story = {
  args: { selected: true },
};

export const WithoutImage: Story = {
  args: { src: undefined },
};
