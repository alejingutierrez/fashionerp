import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import { FilterChip } from './FilterChip';

const meta: Meta<typeof FilterChip> = {
  title: 'Molecules/FilterChip',
  component: FilterChip,
  args: {
    id: 'category',
    label: 'Categoría: Zapatos',
    color: 'primary',
  },
  argTypes: {
    id: { control: 'text' },
    label: { control: 'text' },
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
    variant: { control: 'radio', options: ['filled', 'outlined'] },
    size: { control: 'radio', options: ['small', 'medium'] },
    onRemove: { action: 'removed' },
    maxWidth: { control: 'number' },
  },
};
export default meta;

type Story = StoryObj<typeof FilterChip>;

export const Default: Story = {};

export const LongText: Story = {
  args: {
    label: 'Nombre contiene: Zapatilla Deportiva Muy Larga',
  },
};

export const Multiple: Story = {
  render: (args) => (
    <Box display="flex" gap={1} flexWrap="wrap">
      <FilterChip {...args} id="color" label="Color: Rojo" />
      <FilterChip {...args} id="size" label="Tamaño: Grande" />
      <FilterChip {...args} id="brand" label="Marca: Adidas" />
    </Box>
  ),
};
