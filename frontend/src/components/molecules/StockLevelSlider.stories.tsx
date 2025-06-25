import type { Meta, StoryObj } from '@storybook/react';
import { StockLevelSlider } from './StockLevelSlider';

const meta: Meta<typeof StockLevelSlider> = {
  title: 'Molecules/StockLevelSlider',
  component: StockLevelSlider,
  args: {
    value: 50,
  },
  argTypes: {
    onChange: { action: 'changed' },
    onCommit: { action: 'committed' },
    value: { control: 'number' },
    readOnly: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof StockLevelSlider>;

export const Full: Story = {
  args: { value: 100 },
};

export const Medium: Story = {
  args: { value: 50 },
};

export const Critical: Story = {
  args: { value: 10 },
};

export const Empty: Story = {
  args: { value: 0 },
};

export const Locked: Story = {
  args: { readOnly: true },
};
