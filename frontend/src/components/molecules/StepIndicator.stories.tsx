import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import { StepIndicator } from './StepIndicator';

const meta: Meta<typeof StepIndicator> = {
  title: 'Molecules/StepIndicator',
  component: StepIndicator,
  args: {
    step: 1,
    label: 'Información',
    status: 'pending',
    orientation: 'horizontal',
    connector: false,
  },
  argTypes: {
    step: { control: { type: 'number', min: 1 } },
    label: { control: 'text' },
    status: { control: 'radio', options: ['pending', 'current', 'completed'] },
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
    connector: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof StepIndicator>;

export const Default: Story = {};

export const Current: Story = { args: { status: 'current' } };
export const Completed: Story = { args: { status: 'completed' } };
export const WithConnector: Story = { args: { connector: true } };

export const DemoFlowHorizontal: Story = {
  render: (args) => (
    <Box display="flex" alignItems="center">
      <StepIndicator {...args} step={1} label="Paso 1" status="completed" connector />
      <StepIndicator {...args} step={2} label="Paso 2" status="current" connector />
      <StepIndicator {...args} step={3} label="Paso 3" status="pending" />
    </Box>
  ),
  parameters: { controls: { exclude: ['step', 'label', 'status', 'connector', 'orientation'] } },
};

export const DemoFlowVertical: Story = {
  render: (args) => (
    <Box display="flex" flexDirection="column" alignItems="center">
      <StepIndicator {...args} step={1} label="Paso 1" status="completed" connector orientation="vertical" />
      <StepIndicator {...args} step={2} label="Paso 2" status="current" connector orientation="vertical" />
      <StepIndicator {...args} step={3} label="Paso 3" status="pending" orientation="vertical" />
    </Box>
  ),
  parameters: { controls: { exclude: ['step', 'label', 'status', 'connector', 'orientation'] } },
};
