import type { Meta, StoryObj } from '@storybook/react';
import { PriceStepper } from './PriceStepper';

const meta: Meta<typeof PriceStepper> = {
  title: 'Molecules/PriceStepper',
  component: PriceStepper,
  args: {
    value: 0,
  },
  argTypes: {
    onChange: { action: 'changed' },
    value: { control: 'number' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    size: { control: 'radio', options: ['small', 'medium'] },
  },
};
export default meta;

type Story = StoryObj<typeof PriceStepper>;

export const AjusteLibre: Story = {};

export const AlcanzaMaximo: Story = {
  args: { value: 0.95, max: 1 },
};

export const AlcanzaMinimo: Story = {
  args: { value: 0.05, min: 0 },
};

export const ModoReadOnly: Story = {
  args: { readOnly: true },
};
