import type { Meta, StoryObj } from '@storybook/react';
import { AvatarStatus } from './AvatarStatus';

const meta: Meta<typeof AvatarStatus> = {
  title: 'Molecules/AvatarStatus',
  component: AvatarStatus,
  args: {
    name: 'Ana Gómez',
    src: 'https://i.pravatar.cc/40',
    status: 'online',
    size: 'medium',
    position: 'bottom-right',
  },
  argTypes: {
    status: { control: 'select', options: ['online', 'offline', 'away', 'busy'] },
    position: {
      control: 'select',
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
    },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    src: { control: 'text' },
    name: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof AvatarStatus>;

export const Online: Story = {};

export const Offline: Story = {
  args: { status: 'offline' },
};

export const Away: Story = {
  args: { status: 'away' },
};

export const Busy: Story = {
  args: { status: 'busy' },
};

export const CustomPosition: Story = {
  args: { position: 'top-left' },
};

export const NoImage: Story = {
  args: { src: undefined },
};

export const Large: Story = {
  args: { size: 'large' },
};
