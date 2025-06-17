import type { Meta, StoryObj } from '@storybook/react';
import { PromotionBadge } from './PromotionBadge';

const meta: Meta<typeof PromotionBadge> = {
  title: 'Molecules/PromotionBadge',
  component: PromotionBadge,
  args: {
    label: '20% OFF',
    color: 'secondary',
    withIcon: true,
  },
  argTypes: {
    color: {
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
    withIcon: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
};
export default meta;

type Story = StoryObj<typeof PromotionBadge>;

export const WithIcon: Story = {};

export const WithoutIcon: Story = {
  args: { withIcon: false, label: 'PROMO' },
};
