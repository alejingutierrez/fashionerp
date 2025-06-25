import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  args: {
    src: 'https://i.pravatar.cc/40',
    alt: 'Foto de usuario',
    size: 'medium',
  },
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    variant: { control: 'select', options: ['circular', 'rounded', 'square'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
  },
};
export default meta;

type Story = StoryObj<typeof Avatar>;

export const Image: Story = {};

export const Initials: Story = {
  args: { src: undefined, children: 'AB' },
};

export const Rounded: Story = {
  args: { variant: 'rounded' },
};

export const Large: Story = {
  args: { size: 'large' },
};
