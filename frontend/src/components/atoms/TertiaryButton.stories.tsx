import type { Meta, StoryObj } from '@storybook/react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { TertiaryButton } from './TertiaryButton';

const meta: Meta<typeof TertiaryButton> = {
  title: 'Atoms/TertiaryButton',
  component: TertiaryButton,
  args: {
    children: 'Tertiary action',
  },
  argTypes: {
    onClick: { action: 'clicked' },
    startIcon: { control: false },
    endIcon: { control: false },
    children: { control: 'text' },
    disabled: { control: 'boolean' },
    href: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof TertiaryButton>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true, children: "Can't click" },
};

export const WithIcon: Story = {
  args: { endIcon: <ArrowForwardIcon /> },
};
