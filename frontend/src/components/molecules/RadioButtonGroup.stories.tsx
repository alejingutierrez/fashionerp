import type { Meta, StoryObj } from '@storybook/react';
import { RadioButtonGroup } from './RadioButtonGroup';

const meta: Meta<typeof RadioButtonGroup> = {
  title: 'Molecules/RadioButtonGroup',
  component: RadioButtonGroup,
  args: {
    label: 'Género',
    options: [
      { value: 'hombre', label: 'Hombre' },
      { value: 'mujer', label: 'Mujer' },
      { value: 'n/a', label: 'No definido' },
    ],
    value: 'hombre',
  },
  argTypes: {
    onChange: { action: 'changed' },
    value: { control: 'text' },
    orientation: { control: 'radio', options: ['vertical', 'horizontal'] },
    disabled: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof RadioButtonGroup>;

export const Vertical: Story = {};

export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
};

export const OptionDisabled: Story = {
  args: {
    options: [
      { value: 'hombre', label: 'Hombre' },
      { value: 'mujer', label: 'Mujer', disabled: true },
      { value: 'n/a', label: 'No definido' },
    ],
    value: 'n/a',
  },
};

export const GroupDisabled: Story = {
  args: { disabled: true },
};

export const LongLabel: Story = {
  args: {
    options: [
      {
        value: 'l',
        label:
          'Opción con una etiqueta extremadamente larga para probar el comportamiento',
      },
      { value: 's', label: 'Corta' },
    ],
    value: 'l',
  },
};
