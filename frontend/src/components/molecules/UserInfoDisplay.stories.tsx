import type { Meta, StoryObj } from '@storybook/react';
import { UserInfoDisplay } from './UserInfoDisplay';

const meta: Meta<typeof UserInfoDisplay> = {
  title: 'Molecules/UserInfoDisplay',
  component: UserInfoDisplay,
  args: {
    name: 'Ana Gómez',
    secondaryInfo: 'Vendedora',
    src: 'https://i.pravatar.cc/40',
    orientation: 'horizontal',
    chipLabel: 'VIP',
    size: 'medium',
  },
  argTypes: {
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    src: { control: 'text' },
    name: { control: 'text' },
    secondaryInfo: { control: 'text' },
    chipLabel: { control: 'text' },
    loading: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof UserInfoDisplay>;

export const Horizontal: Story = {};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
};

export const NoImage: Story = {
  args: { src: undefined },
};

export const WithoutSecondary: Story = {
  args: { secondaryInfo: undefined },
};

export const Loading: Story = {
  args: { loading: true },
};
