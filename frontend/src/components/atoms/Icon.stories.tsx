import type { Meta, StoryObj } from '@storybook/react';
import { Icon, IconName } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  args: {
    name: 'search' as IconName,
  },
  argTypes: {
    name: {
      control: 'select',
      options: [
        'search',
        'user',
        'settings',
        'menu',
        'close',
        'delete',
        'favorite',
        'info',
      ],
    },
    color: {
      control: 'select',
      options: ['inherit', 'primary', 'secondary', 'error', 'info'],
    },
    size: {
      control: 'select',
      options: ['inherit', 'small', 'medium', 'large'],
    },
    icon: { control: false },
  },
};
export default meta;

type Story = StoryObj<typeof Icon>;

export const Basic: Story = {};

export const Gallery: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Icon name="search" />
      <Icon name="user" />
      <Icon name="settings" />
      <Icon name="menu" />
      <Icon name="close" />
      <Icon name="delete" color="error" />
      <Icon name="favorite" color="secondary" />
      <Icon name="info" color="info" />
    </div>
  ),
};
