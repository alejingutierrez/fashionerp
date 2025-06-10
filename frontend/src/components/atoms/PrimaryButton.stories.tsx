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
