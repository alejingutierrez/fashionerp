import type { Meta, StoryObj } from '@storybook/react';
import { FormActionGroup } from './FormActionGroup';

const meta: Meta<typeof FormActionGroup> = {
  title: 'Molecules/FormActionGroup',
  component: FormActionGroup,
  args: {
    primaryText: 'Guardar',
    cancelText: 'Cancelar',
  },
  argTypes: {
    primaryText: { control: 'text' },
    cancelText: { control: 'text' },
    cancelHref: { control: 'text' },
    primaryDisabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    align: { control: 'radio', options: ['right', 'spread'] },
    onPrimary: { action: 'primary' },
    onCancel: { action: 'cancel' },
  },
};
export default meta;

type Story = StoryObj<typeof FormActionGroup>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { primaryDisabled: true },
};

export const Loading: Story = {
  args: { loading: true },
};

export const Spread: Story = {
  args: { align: 'spread' },
};
