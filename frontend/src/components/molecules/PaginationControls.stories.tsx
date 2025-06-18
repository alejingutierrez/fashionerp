import type { Meta, StoryObj } from '@storybook/react';
import { PaginationControls } from './PaginationControls';

const meta: Meta<typeof PaginationControls> = {
  title: 'Molecules/PaginationControls',
  component: PaginationControls,
  args: { page: 1, totalPages: 10, showNumbers: true },
  argTypes: {
    onPageChange: { action: 'page changed' },
    page: { control: { type: 'number', min: 1 } },
    totalPages: { control: { type: 'number', min: 1 } },
    showNumbers: { control: 'boolean' },
    size: { control: 'radio', options: ['small', 'medium'] },
  },
};
export default meta;

type Story = StoryObj<typeof PaginationControls>;

export const Default: Story = {};
export const Simple: Story = { args: { showNumbers: false } };
export const LastPage: Story = { args: { page: 10 } };
export const MiddlePage: Story = { args: { page: 5 } };
