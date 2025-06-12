import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';
import FaceIcon from '@mui/icons-material/Face';

const meta: Meta<typeof Chip> = {
  title: 'Atoms/Chip',
  component: Chip,
  args: {
    label: 'Etiqueta',
  },
  argTypes: {
    onClick: { action: 'clicked' },
    onDelete: { action: 'deleted' },
    icon: { control: false },
    avatar: { control: false },
    color: {
      control: 'select',
      options: [
        'default',
        'primary',
        'secondary',
        'error',
        'info',
        'success',
        'warning',
      ],
    },
    variant: { control: 'select', options: ['filled', 'outlined'] },
    disabled: { control: 'boolean' },
    clickable: { control: false },
  },
};
export default meta;

type Story = StoryObj<typeof Chip>;

export const Basic: Story = {};

export const Clickable: Story = {
  args: { onClick: () => {}, color: 'primary' },
};

export const Deletable: Story = {
  args: { onDelete: () => {} },
};

export const ClickableDeletable: Story = {
  args: { onClick: () => {}, onDelete: () => {}, color: 'secondary' },
};

export const WithIcon: Story = {
  args: { icon: <FaceIcon /> },
};

export const Disabled: Story = {
  args: { disabled: true, onClick: () => {} },
};

export const Outlined: Story = {
  args: { variant: 'outlined' },
};
