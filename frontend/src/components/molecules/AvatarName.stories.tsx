import type { Meta, StoryObj } from '@storybook/react';
import { AvatarName } from './AvatarName';

const meta: Meta<typeof AvatarName> = {
  title: 'Molecules/AvatarName',
  component: AvatarName,
  args: {
    name: 'Ana Gómez',
    src: 'https://i.pravatar.cc/40',
    size: 'medium',
    orientation: 'horizontal',
  },
  argTypes: {
    src: { control: 'text' },
    name: { control: 'text' },
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    variant: { control: 'select', options: ['circular', 'rounded', 'square'] },
  },
};
export default meta;

type Story = StoryObj<typeof AvatarName>;

export const Horizontal: Story = {};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
};

export const NoImage: Story = {
  args: { src: undefined },
};
