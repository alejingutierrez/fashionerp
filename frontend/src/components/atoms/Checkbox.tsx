import MuiCheckbox, { CheckboxProps as MuiCheckboxProps } from '@mui/material/Checkbox';

export type CheckboxProps = MuiCheckboxProps;

/**
 * Casilla de verificación basada en MUI `Checkbox`.
 */
export function Checkbox({ color = 'primary', ...props }: CheckboxProps) {
  return <MuiCheckbox color={color} {...props} />;
}

export default Checkbox;
