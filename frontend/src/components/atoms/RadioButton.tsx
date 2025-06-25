import MuiRadio, { RadioProps as MuiRadioProps } from '@mui/material/Radio';

export type RadioButtonProps = MuiRadioProps;

/**
 * Botón de opción basado en MUI `Radio`.
 */
export function RadioButton({ color = 'primary', ...props }: RadioButtonProps) {
  return <MuiRadio color={color} {...props} />;
}

export default RadioButton;
