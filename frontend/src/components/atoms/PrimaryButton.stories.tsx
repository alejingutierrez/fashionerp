import type { Meta, StoryObj } from '@storybook/react';
import SaveIcon from '@mui/icons-material/Save';
import { PrimaryButton } from './PrimaryButton';

const meta: Meta<typeof PrimaryButton> = {
  title: 'Atoms/PrimaryButton',
  component: PrimaryButton,
  args: {
    children: 'Save',
  },
  argTypes: {
    onClick: { action: 'clicked' },
    startIcon: { control: false },
    endIcon: { control: false },
    /* Controles adicionales para estados de carga */
    loadingPosition: {
      control: 'select',
      options: ['center', 'start', 'end'],
    },
    loadingText: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof PrimaryButton>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true, children: "Can't click" },
};

export const WithIcon: Story = {
  args: { startIcon: <SaveIcon /> },
};

export const Loading: Story = {
  args: { loading: true },
};

export const LoadingStart: Story = {
  args: { loading: true, loadingPosition: 'start', children: 'Save' },
};

export const LoadingWithText: Story = {
  args: { loading: true, loadingText: 'Saving...' },
};
