import type { Meta, StoryObj } from '@storybook/react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { IconWithBadge } from './IconWithBadge';

const meta: Meta<typeof IconWithBadge> = {
  title: 'Molecules/IconWithBadge',
  component: IconWithBadge,
  args: {
    icon: <NotificationsIcon />,
    label: 'notificaciones',
    count: 3,
    badgeColor: 'error',
    variant: 'standard',
    position: 'top-right',
    size: 'medium',
  },
  argTypes: {
    name: {
      control: 'select',
      options: ['search', 'user', 'settings', 'menu', 'close', 'delete', 'favorite'],
    },
    icon: { control: false },
    color: {
      control: 'select',
      options: [
        'inherit',
        'primary',
        'secondary',
        'action',
        'disabled',
        'error',
        'info',
        'success',
        'warning',
      ],
    },
    size: { control: 'select', options: ['inherit', 'small', 'medium', 'large'] },
    count: { control: 'number' },
    badgeColor: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'info', 'success', 'warning'],
    },
    variant: { control: 'select', options: ['standard', 'dot'] },
    showZero: { control: 'boolean' },
    max: { control: 'number' },
    position: {
      control: 'select',
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof IconWithBadge>;

export const Default: Story = {};
export const NoNotifications: Story = { args: { count: 0 } };
export const Many: Story = { args: { count: 120, max: 99 } };
export const DotVariant: Story = { args: { variant: 'dot' } };
