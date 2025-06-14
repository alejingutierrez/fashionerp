import { useId, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { TextField, TextFieldProps, Label } from '../../atoms';

export interface FormFieldProps extends Omit<TextFieldProps, 'label'> {
  /** Texto de la etiqueta */
  label: string;
  /** Mensaje de error a mostrar */
  errorMessage?: string;
}

/**
 * Combina un `Label` con un `TextField` para formar un campo de formulario.
 */
export function FormField({
  label,
  id,
  error = false,
  errorMessage,
  onFocus,
  onBlur,
  ...props
}: FormFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [focused, setFocused] = useState(false);

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    setFocused(false);
    onBlur?.(e);
  };

  return (
    <Box display="flex" flexDirection="column" gap={0.5}>
      <Label
        htmlFor={inputId}
        sx={{
          mb: 0.5,
          color: error ? 'error.main' : focused ? 'primary.main' : undefined,
        }}
      >
        {label}
      </Label>
      <TextField
        id={inputId}
        error={error}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      {error && errorMessage && (
        <Typography variant="caption" color="error" data-testid="error-text">
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
}

export default FormField;
