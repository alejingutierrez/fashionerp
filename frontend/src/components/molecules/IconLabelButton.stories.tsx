import type { Meta, StoryObj } from '@storybook/react';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import SettingsIcon from '@mui/icons-material/Settings';
import { IconLabelButton } from './IconLabelButton';

const meta: Meta<typeof IconLabelButton> = {
  title: 'Molecules/IconLabelButton',
  component: IconLabelButton,
  args: {
    icon: <SaveIcon />,
    label: 'Guardar',
    iconPosition: 'left',
    ariaLabel: 'accion',
    disabled: false,
  },
  argTypes: {
    icon: { control: false },
    iconPosition: { control: 'radio', options: ['left', 'right'] },
    label: { control: 'text' },
    ariaLabel: { control: 'text' },
    onClick: { action: 'clicked' },
    disabled: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof IconLabelButton>;

export const LeftIcon: Story = {};

export const RightIcon: Story = {
  args: { iconPosition: 'right', icon: <SendIcon />, label: 'Enviar' },
};

export const IconOnly: Story = {
  args: { label: undefined, icon: <SettingsIcon />, ariaLabel: 'configuración' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
