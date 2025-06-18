import type { Meta, StoryObj } from '@storybook/react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box } from '@mui/material';
import { BreadcrumbItem } from './BreadcrumbItem';

const meta: Meta<typeof BreadcrumbItem> = {
  title: 'Molecules/BreadcrumbItem',
  component: BreadcrumbItem,
  args: {
    label: 'Inicio',
    href: '#',
    isLast: false,
    separator: '/',
  },
  argTypes: {
    label: { control: 'text' },
    href: { control: 'text' },
    isLast: { control: 'boolean' },
    separator: { control: 'text' },
    onNavigate: { action: 'navigated' },
  },
};
export default meta;

type Story = StoryObj<typeof BreadcrumbItem>;

export const Default: Story = {};

export const Current: Story = {
  args: { isLast: true },
};

export const CustomSeparator: Story = {
  args: { separator: <ChevronRightIcon fontSize="small" /> },
};

export const FullTrail: Story = {
  render: (args) => (
    <Box component="nav" aria-label="breadcrumb" display="flex" gap={0.5}>
      <BreadcrumbItem {...args} label="Inicio" href="#" />
      <BreadcrumbItem {...args} label="Catálogo" href="#" />
      <BreadcrumbItem {...args} label="Verano 2025" href="#" />
      <BreadcrumbItem {...args} label="Producto X" isLast />
    </Box>
  ),
  parameters: { controls: { exclude: ['label', 'href', 'isLast', 'separator'] } },
};
