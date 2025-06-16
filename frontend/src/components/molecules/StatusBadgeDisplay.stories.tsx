import type { Meta, StoryObj } from '@storybook/react';
import { StatusBadgeDisplay } from './StatusBadgeDisplay';

const meta: Meta<typeof StatusBadgeDisplay> = {
  title: 'Molecules/StatusBadgeDisplay',
  component: StatusBadgeDisplay,
  args: {
    label: 'Activo',
    status: 'success',
    badgePosition: 'start',
    size: 'medium',
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['success', 'warning', 'error', 'info', 'default'],
    },
    badgePosition: { control: 'radio', options: ['start', 'end'] },
    size: { control: 'select', options: ['small', 'medium'] },
    label: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof StatusBadgeDisplay>;

export const Active: Story = {};

export const Pending: Story = {
  args: { status: 'warning', label: 'Pendiente' },
};

export const Inactive: Story = {
  args: { status: 'default', label: 'Inactivo' },
};

export const ErrorState: Story = {
  args: { status: 'error', label: 'Error' },
};

export const Info: Story = {
  args: { status: 'info', label: 'Info' },
};

export const EndPosition: Story = {
  args: { badgePosition: 'end' },
};

export const Compact: Story = {
  args: { label: '' },
};

export const Small: Story = {
  args: { size: 'small' },
};
