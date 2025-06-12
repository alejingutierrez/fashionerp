import type { Meta, StoryObj } from '@storybook/react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  args: {
    content: 5,
    children: <NotificationsIcon />,
    color: 'error',
  },
  argTypes: {
    children: { control: false },
    content: { control: 'text' },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'info', 'success', 'warning'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const Overflow: Story = {
  args: { content: 100, max: 99 },
};

export const ShowZero: Story = {
  args: { content: 0, showZero: true },
};

export const Dot: Story = {
  args: { variant: 'dot', content: 0 },
};
