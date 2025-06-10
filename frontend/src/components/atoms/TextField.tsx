import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material/TextField';

export type TextFieldProps = MuiTextFieldProps;

/**
 * Campo de texto de una sola línea basado en MUI `TextField`.
 */
export function TextField({
  variant = 'outlined',
  fullWidth = true,
  ...props
}: TextFieldProps) {
  return <MuiTextField variant={variant} fullWidth={fullWidth} {...props} />;
}

export default TextField;
