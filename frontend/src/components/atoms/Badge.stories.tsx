import type { Meta, StoryObj } from '@storybook/react';
import MailIcon from '@mui/icons-material/Mail';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  args: {
    content: 5,
    children: <MailIcon />,
  },
  argTypes: {
    content: { control: 'number' },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'info', 'success', 'warning'],
    },
    max: { control: 'number' },
    showZero: { control: 'boolean' },
    variant: { control: 'select', options: ['standard', 'dot'] },
    children: { control: false },
  },
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const ZeroHidden: Story = {
  args: { content: 0, showZero: false },
};

export const ZeroVisible: Story = {
  args: { content: 0, showZero: true },
};

export const DotVariant: Story = {
  args: { variant: 'dot', content: 0 },
};

export const Overflow: Story = {
  args: { content: 120, max: 99 },
};
