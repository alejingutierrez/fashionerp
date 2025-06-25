import type { Meta, StoryObj } from '@storybook/react';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { Box } from '@mui/material';
import { NavItem } from './NavItem';

const meta: Meta<typeof NavItem> = {
  title: 'Molecules/NavItem',
  component: NavItem,
  args: {
    icon: <CheckroomIcon />,
    label: 'Productos',
    href: '#',
    active: false,
    disabled: false,
    collapsed: false,
  },
  argTypes: {
    icon: { control: false },
    label: { control: 'text' },
    href: { control: 'text' },
    active: { control: 'boolean' },
    disabled: { control: 'boolean' },
    collapsed: { control: 'boolean' },
    onClick: { action: 'clicked' },
    badgeContent: { control: 'number' },
  },
};
export default meta;

type Story = StoryObj<typeof NavItem>;

export const Default: Story = {};

export const Active: Story = {
  args: { active: true },
};

export const Disabled: Story = {
  args: { disabled: true, icon: <AssessmentIcon />, label: 'Reportes' },
};

export const CollapsedMenu: Story = {
  render: (args) => (
    <Box display="flex" flexDirection="column" width={56} gap={1}>
      <NavItem {...args} collapsed icon={<CheckroomIcon />} />
      <NavItem {...args} collapsed icon={<Inventory2Icon />} label="Inventario" />
      <NavItem {...args} collapsed icon={<AssessmentIcon />} label="Reportes" />
    </Box>
  ),
};
