import type { Meta, StoryObj } from '@storybook/react';
import { ImageUpload } from './ImageUpload';

const meta: Meta<typeof ImageUpload> = {
  title: 'Molecules/ImageUpload',
  component: ImageUpload,
  parameters: {
    controls: { exclude: ['uploadFn', 'onChange'] },
  },
};
export default meta;

type Story = StoryObj<typeof ImageUpload>;

export const Vacío: Story = {};
export const Arrastrando: Story = {
  render: (args) => <ImageUpload {...args} />,
  play: async ({ canvasElement }) => {
    const dropzone = canvasElement.querySelector('[data-testid="dropzone"]');
    dropzone?.dispatchEvent(new DragEvent('dragover', { bubbles: true }));
  },
};
export const Subiendo: Story = {
  args: {
    uploadFn: () => new Promise(() => {}),
  },
  play: async ({ canvasElement }) => {
    const dropzone = canvasElement.querySelector('[data-testid="dropzone"]');
    dropzone?.dispatchEvent(new DragEvent('dragover', { bubbles: true }));
  },
};
export const Cargado: Story = {
  args: { value: 'https://picsum.photos/128' },
};
export const FormatoInválido: Story = {
  args: {
    uploadFn: () => Promise.reject(new Error('Formato inválido')),
  },
};
