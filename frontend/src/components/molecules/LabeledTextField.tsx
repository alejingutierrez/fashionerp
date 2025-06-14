import { Box, Typography } from '@mui/material';
import { useId, useState } from 'react';
import { TextField, TextFieldProps } from '../atoms';

export interface LabeledTextFieldProps extends Omit<TextFieldProps, 'label'> {
  /** Texto de la etiqueta */
  label: string;
}

/**
 * Campo de texto con etiqueta visible. Combina un `TextField` y un `label` para
 * conformar una unidad de formulario coherente.
 */
export function LabeledTextField({
  label,
  id,
  size = 'medium',
  error = false,
  helperText,
  disabled = false,
  onFocus,
  onBlur,
  ...props
}: LabeledTextFieldProps) {
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
      <Typography
        component="label"
        htmlFor={inputId}
        sx={{
          mb: 0.5,
          color: error ? 'error.main' : focused ? 'primary.main' : undefined,
        }}
      >
        {label}
      </Typography>
      <TextField
        id={inputId}
        size={size}
        error={error}
        helperText={helperText}
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    </Box>
  );
}

export default LabeledTextField;
