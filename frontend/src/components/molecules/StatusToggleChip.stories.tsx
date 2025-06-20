import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { StatusToggleChip } from './StatusToggleChip';

const meta: Meta<typeof StatusToggleChip> = {
  title: 'Molecules/StatusToggleChip',
  component: StatusToggleChip,
  args: {
    defaultActive: true,
    loading: false,
    disabled: false,
    hasPermission: true,
  },
  argTypes: {
    onToggle: { action: 'toggled' },
    defaultActive: { control: 'boolean' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    hasPermission: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof StatusToggleChip>;

export const Active: Story = {};

export const Inactive: Story = { args: { defaultActive: false } };

export const Loading: Story = { args: { loading: true } };

export const Disabled: Story = { args: { disabled: true } };

export const ToggleEnVivo: Story = {
  render: function ToggleEnVivoRender(args) {
    const [active, setActive] = useState(args.defaultActive);
    return (
      <StatusToggleChip
        {...args}
        defaultActive={active}
        onToggle={(next) => setActive(next)}
      />
    );
  },
  parameters: { controls: { exclude: ['onToggle'] } },
};
