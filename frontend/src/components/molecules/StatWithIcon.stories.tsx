import type { Meta, StoryObj } from '@storybook/react';
import { StatWithIcon } from './StatWithIcon';

const meta: Meta<typeof StatWithIcon> = {
  title: 'Molecules/StatWithIcon',
  component: StatWithIcon,
  args: {
    name: 'favorite',
    value: '1,256',
    label: 'Ventas hoy',
    orientation: 'horizontal',
  },
  argTypes: {
    name: {
      control: 'select',
      options: ['search', 'user', 'settings', 'menu', 'close', 'delete', 'favorite'],
    },
    icon: { control: false },
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
    trend: { control: 'radio', options: ['up', 'down'] },
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
  },
};
export default meta;

type Story = StoryObj<typeof StatWithIcon>;

export const Default: Story = {};
export const Vertical: Story = { args: { orientation: 'vertical' } };
export const TrendUp: Story = { args: { trend: 'up' } };
export const TrendDown: Story = { args: { trend: 'down' } };
