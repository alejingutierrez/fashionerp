import type { Meta, StoryObj } from '@storybook/react';
import { InfoTooltipIcon } from './InfoTooltipIcon';

const meta: Meta<typeof InfoTooltipIcon> = {
  title: 'Molecules/InfoTooltipIcon',
  component: InfoTooltipIcon,
  args: {
    text: 'Introduce el precio sin impuestos',
    placement: 'right',
    color: 'action',
    size: 'medium',
  },
  argTypes: {
    text: { control: 'text' },
    placement: {
      control: 'select',
      options: ['bottom', 'top', 'right', 'left'],
    },
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
    name: {
      control: 'select',
      options: [
        'info',
        'search',
        'user',
        'settings',
        'menu',
        'close',
        'delete',
        'favorite',
      ],
    },
    icon: { control: false },
  },
};
export default meta;

type Story = StoryObj<typeof InfoTooltipIcon>;

export const Default: Story = {};

export const LeftPlacement: Story = {
  args: { placement: 'left' },
};

export const PrimaryColor: Story = {
  args: { color: 'primary' },
};
