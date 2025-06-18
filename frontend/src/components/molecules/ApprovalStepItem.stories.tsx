import type { Meta, StoryObj } from '@storybook/react';
import { ApprovalStepItem } from './ApprovalStepItem';

const meta: Meta<typeof ApprovalStepItem> = {
  title: 'Molecules/ApprovalStepItem',
  component: ApprovalStepItem,
  args: {
    name: 'Juan P.',
    avatarSrc: 'https://i.pravatar.cc/40?img=3',
    status: 'approved',
    info: '01/05/2025',
    orientation: 'horizontal',
    current: false,
  },
  argTypes: {
    status: { control: 'select', options: ['approved', 'pending', 'rejected'] },
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
    current: { control: 'boolean' },
    avatarSrc: { control: 'text' },
    name: { control: 'text' },
    info: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof ApprovalStepItem>;

export const Approved: Story = {};

export const Pending: Story = {
  args: {
    status: 'pending',
    name: 'Mar\u00eda S.',
    avatarSrc: 'https://i.pravatar.cc/40?img=1',
    info: undefined,
  },
};

export const Rejected: Story = {
  args: {
    status: 'rejected',
    name: 'Jos\u00e9 L.',
    avatarSrc: 'https://i.pravatar.cc/40?img=2',
    info: '01/06/2025',
  },
};

export const VerticalTimeline: Story = {
  args: { orientation: 'vertical' },
};
