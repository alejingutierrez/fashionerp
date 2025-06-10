import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
  title: 'Atoms/TextArea',
  component: TextArea,
  args: {
    label: 'Descripción',
  },
  argTypes: {
    onChange: { action: 'changed' },
    value: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    autoFocus: { control: 'boolean' },
    resizable: { control: 'boolean' },
    rows: { control: 'number' },
    minRows: { control: 'number' },
  },
};
export default meta;

type Story = StoryObj<typeof TextArea>;

export const Empty: Story = {};

export const WithText: Story = {
  args: {
    value: 'L\u00ednea 1\nL\u00ednea 2\nL\u00ednea 3',
  },
};

export const Error: Story = {
  args: {
    error: true,
    helperText: 'Descripci\u00f3n requerida',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
