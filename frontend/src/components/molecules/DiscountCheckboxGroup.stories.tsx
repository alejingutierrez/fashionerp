import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DiscountCheckboxGroup, DiscountOption } from './DiscountCheckboxGroup';

const options: DiscountOption[] = [
  { id: '2x1', label: '2×1', category: 'Promo' },
  { id: 'season', label: 'Fin de temporada' },
  { id: 'employee', label: 'Precio Empleado' },
];

const conflicts = { employee: ['2x1'] };

const meta: Meta<typeof DiscountCheckboxGroup> = {
  title: 'Molecules/DiscountCheckboxGroup',
  component: DiscountCheckboxGroup,
  argTypes: {
    value: { control: false },
    onChange: { action: 'changed' },
  },
};
export default meta;

type Story = StoryObj<typeof DiscountCheckboxGroup>;

export const TodoOff: Story = {
  args: {
    options,
    value: [],
  },
};

export const CombinacionValida: Story = {
  render: function CombinacionValidaRender(args) {
    const [value, setValue] = useState(['2x1', 'season']);
    return (
      <DiscountCheckboxGroup
        {...args}
        options={options}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const ConflictoDetectado: Story = {
  render: function ConflictoRender(args) {
    const [value, setValue] = useState(['2x1']);
    return (
      <DiscountCheckboxGroup
        {...args}
        options={options}
        conflicts={conflicts}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const GrupoDeshabilitado: Story = {
  args: {
    options,
    value: [],
    disabled: true,
  },
};
