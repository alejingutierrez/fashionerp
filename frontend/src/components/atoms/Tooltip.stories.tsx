import type { Meta, StoryObj } from '@storybook/react';
import InfoIcon from '@mui/icons-material/Info';
import { Tooltip } from './Tooltip';
import { IconButton } from './IconButton';

const meta: Meta<typeof Tooltip> = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  args: {
    title: 'Texto explicativo',
    placement: 'bottom',
    arrow: true,
    children: <IconButton icon={<InfoIcon />} aria-label="info" />,
  },
  argTypes: {
    title: { control: 'text' },
    placement: {
      control: 'select',
      options: ['bottom', 'top', 'right', 'left'],
    },
    arrow: { control: 'boolean' },
    children: { control: false },
    open: { control: false },
  },
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {};

export const RightPlacement: Story = {
  args: { placement: 'right' },
};

export const WithoutArrow: Story = {
  args: { arrow: false },
};
