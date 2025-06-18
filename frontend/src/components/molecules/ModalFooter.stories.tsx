import type { Meta, StoryObj } from '@storybook/react';
import { ModalFooter } from './ModalFooter';

const meta: Meta<typeof ModalFooter> = {
  title: 'Molecules/ModalFooter',
  component: ModalFooter,
  args: {
    primaryText: 'Guardar',
    secondaryText: 'Cancelar',
  },
  argTypes: {
    primaryText: { control: 'text' },
    secondaryText: { control: 'text' },
    primaryDisabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    align: { control: 'radio', options: ['right', 'center'] },
    onPrimary: { action: 'primary' },
    onSecondary: { action: 'secondary' },
  },
};
export default meta;

type Story = StoryObj<typeof ModalFooter>;

export const Default: Story = {};

export const PrimaryDisabled: Story = {
  args: { primaryDisabled: true },
};

export const Loading: Story = {
  args: { loading: true },
};

export const SingleButton: Story = {
  args: { secondaryText: undefined, onSecondary: undefined, align: 'center' },
};
