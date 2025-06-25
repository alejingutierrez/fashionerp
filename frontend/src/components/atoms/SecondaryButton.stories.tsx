import type { Meta, StoryObj } from '@storybook/react';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { SecondaryButton } from './SecondaryButton';

const meta: Meta<typeof SecondaryButton> = {
  title: 'Atoms/SecondaryButton',
  component: SecondaryButton,
  args: {
    children: 'Secondary action',
  },
  argTypes: {
    onClick: { action: 'clicked' },
    startIcon: { control: false },
    endIcon: { control: false },
    children: { control: 'text' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    loadingPosition: {
      control: 'select',
      options: ['center', 'start', 'end'],
    },
    loadingText: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof SecondaryButton>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true, children: "Can't click" },
};

export const WithIcons: Story = {
  args: {
    startIcon: <SaveIcon />,
    endIcon: <DeleteIcon />,
  },
};

export const Loading: Story = {
  args: { loading: true },
};

export const LoadingWithText: Story = {
  args: { loading: true, loadingText: 'Saving...' },
};
