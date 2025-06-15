import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Molecules/SearchBar',
  component: SearchBar,
  args: {
    placeholder: 'Buscar',
  },
  argTypes: {
    onSearch: { action: 'searched' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    size: { control: 'radio', options: ['small', 'medium'] },
  },
};
export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Small: Story = {
  args: { size: 'small' },
};
