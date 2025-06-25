import type { Meta, StoryObj } from '@storybook/react';
import { SecondaryButton } from './SecondaryButton';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

const meta: Meta<typeof SecondaryButton> = {
  title: 'Atoms/SecondaryButton',
  component: SecondaryButton,
  args: {
    children: 'Secondary action',
    disabled: false,
  },
  argTypes: {
    children: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof SecondaryButton>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};

export const WithIcons: Story = {
  args: {
    startIcon: <SaveIcon />,
    endIcon: <DeleteIcon />,
  },
};
