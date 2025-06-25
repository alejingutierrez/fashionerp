import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';

const meta: Meta<typeof Link> = {
  title: 'Atoms/Link',
  component: Link,
  args: {
    href: '#',
    children: 'Visit section',
  },
  argTypes: {
    onClick: { action: 'clicked' },
    children: { control: 'text' },
    href: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {};

export const CustomColor: Story = {
  args: { color: 'secondary' },
};
