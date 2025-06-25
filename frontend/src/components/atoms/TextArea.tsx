import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material/TextField';

export interface TextAreaProps extends MuiTextFieldProps {
  /**
   * Permite que el usuario redimensione manualmente el área de texto.
   * Si `false`, se aplica `resize: none`.
   */
  resizable?: boolean;
}

/**
 * Campo de texto multilínea basado en MUI `TextField`.
 */
export function TextArea({
  variant = 'outlined',
  fullWidth = true,
  multiline = true,
  minRows = 3,
  resizable = false,
  InputProps,
  ...props
}: TextAreaProps) {
  return (
    <MuiTextField
      variant={variant}
      fullWidth={fullWidth}
      multiline={multiline}
      minRows={minRows}
      InputProps={{
        ...InputProps,
        sx: {
          '& textarea': { resize: resizable ? 'vertical' : 'none' },
          ...InputProps?.sx,
        },
      }}
      {...props}
    />
  );
}

export default TextArea;
