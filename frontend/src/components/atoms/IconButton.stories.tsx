import type { Meta, StoryObj } from '@storybook/react';
import MenuIcon from '@mui/icons-material/Menu';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from './IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Atoms/IconButton',
  component: IconButton,
  args: {
    icon: <MenuIcon />,
    'aria-label': 'menu',
  },
  argTypes: {
    onClick: { action: 'clicked' },
    icon: { control: false },
    disabled: { control: 'boolean' },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'error', 'info'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};

export const SecondaryColor: Story = {
  args: { icon: <FavoriteIcon />, color: 'secondary', 'aria-label': 'favorite' },
};

export const ErrorColor: Story = {
  args: { icon: <DeleteIcon />, color: 'error', 'aria-label': 'delete' },
};
