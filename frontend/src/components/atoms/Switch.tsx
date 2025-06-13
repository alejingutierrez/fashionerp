import MuiSwitch, { SwitchProps as MuiSwitchProps } from '@mui/material/Switch';

export type SwitchProps = MuiSwitchProps;

/**
 * Control de activación/desactivación basado en MUI `Switch`.
 */
export function Switch({ color = 'primary', ...props }: SwitchProps) {
  return <MuiSwitch color={color} {...props} />;
}

export default Switch;
