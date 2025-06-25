import type { Meta, StoryObj } from '@storybook/react';
import { CustomerListItem } from './CustomerListItem';

const meta: Meta<typeof CustomerListItem> = {
  title: 'Molecules/CustomerListItem',
  component: CustomerListItem,
  args: {
    name: 'Ana G\u00F3mez',
    typeLabel: 'VIP',
    typeColor: 'warning',
    status: 'active',
    src: 'https://i.pravatar.cc/40',
    size: 'medium',
  },
  argTypes: {
    status: { control: 'select', options: ['active', 'inactive'] },
    typeColor: {
      control: 'select',
      options: [
        'default',
        'primary',
        'secondary',
        'error',
        'info',
        'success',
        'warning',
      ],
    },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    src: { control: 'text' },
    name: { control: 'text' },
    typeLabel: { control: 'text' },
    secondaryInfo: { control: 'text' },
    selected: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
};
export default meta;

type Story = StoryObj<typeof CustomerListItem>;

export const WithAvatar: Story = {};

export const WithoutAvatar: Story = {
  args: { src: undefined, typeLabel: 'Nuevo', typeColor: 'success' },
};

export const Inactive: Story = {
  args: { status: 'inactive' },
};

export const WithSecondary: Story = {
  args: { secondaryInfo: 'ana@example.com' },
};
