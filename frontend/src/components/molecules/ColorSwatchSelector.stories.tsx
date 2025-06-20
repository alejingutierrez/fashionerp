import type { Meta, StoryObj } from '@storybook/react';
import { ColorSwatchSelector, ColorSwatch } from './ColorSwatchSelector';

const swatches: ColorSwatch[] = [
  { code: '#ff0000', name: 'Pantone Rojo' },
  { code: '#00ff00', name: 'Pantone Verde' },
  { code: '#0000ff', name: 'Pantone Azul' },
];

const meta: Meta<typeof ColorSwatchSelector> = {
  title: 'Molecules/ColorSwatchSelector',
  component: ColorSwatchSelector,
  args: {
    swatches,
    value: undefined,
    usedColors: [],
    readOnly: false,
  },
  argTypes: {
    value: {
      control: 'select',
      options: swatches.map((s) => s.code).concat(undefined),
    },
    usedColors: { control: 'object' },
    readOnly: { control: 'boolean' },
    onChange: { action: 'change' },
    onDuplicate: { action: 'duplicate' },
  },
};
export default meta;

type Story = StoryObj<typeof ColorSwatchSelector>;

export const SinSeleccion: Story = {};
export const Seleccionado: Story = { args: { value: '#ff0000' } };
export const ColorDuplicado: Story = {
  args: { usedColors: ['#00ff00'], value: '#00ff00' },
};
export const SoloLectura: Story = { args: { readOnly: true, value: '#0000ff' } };
