import type { Meta, StoryObj } from '@storybook/react';
import { ChipTag } from './ChipTag';
import PercentIcon from '@mui/icons-material/Percent';

const meta: Meta<typeof ChipTag> = {
  title: 'Atoms/ChipTag',
  component: ChipTag,
  args: {
    label: '20% OFF',
    color: 'primary',
    icon: <PercentIcon fontSize="small" />,
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
    onClick: { action: 'clicked' },
    icon: { control: false },
  },
};
export default meta;

type Story = StoryObj<typeof ChipTag>;

export const Basic: Story = {};

export const WithoutIcon: Story = {
  args: { icon: undefined, label: 'SALE' },
};
