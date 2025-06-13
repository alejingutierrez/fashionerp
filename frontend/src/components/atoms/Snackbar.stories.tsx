import type { Meta, StoryObj } from '@storybook/react';
import { Snackbar } from './Snackbar';
import { PrimaryButton } from './PrimaryButton';

const meta: Meta<typeof Snackbar> = {
  title: 'Atoms/Snackbar',
  component: Snackbar,
  args: {
    open: true,
    message: 'Cambios guardados',
    autoHideDuration: 3000,
  },
  argTypes: {
    onClose: { action: 'closed' },
    message: { control: 'text' },
    autoHideDuration: { control: 'number' },
    action: { control: false },
    anchorOrigin: { control: false },
    open: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof Snackbar>;

export const Default: Story = {};

export const WithAction: Story = {
  args: {
    action: <PrimaryButton size="small">DESHACER</PrimaryButton>,
  },
};
