import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';

const meta: Meta<typeof Label> = {
  title: 'Atoms/Label',
  component: Label,
  args: {
    htmlFor: 'input',
    children: 'Nombre',
  },
};
export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {};
