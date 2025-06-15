import { Box, Typography } from '@mui/material';
import { useId, useState } from 'react';
import { NumberInput, NumberInputProps } from '../atoms';

export interface LabeledNumberFieldProps extends Omit<NumberInputProps, 'label'> {
  /** Texto de la etiqueta */
  label: string;
}

/**
 * Campo num\u00E9rico con etiqueta visible. Combina un `NumberInput`
 * y un `label` asociado para formar una unidad de formulario.
 */
export function LabeledNumberField({
  label,
  id,
  value,
  onChange,
  min,
  max,
  error = false,
  helperText,
  disabled = false,
  onFocus,
  onBlur,
  ...props
}: LabeledNumberFieldProps) {
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

  const outOfRange =
    typeof value === 'number' &&
    ((min !== undefined && value < min) || (max !== undefined && value > max));

  return (
    <Box display="flex" flexDirection="column" gap={0.5}>
      <Typography
        component="label"
        htmlFor={inputId}
        sx={{
          mb: 0.5,
          color:
            error || outOfRange ? 'error.main' : focused ? 'primary.main' : undefined,
        }}
      >
        {label}
      </Typography>
      <NumberInput
        id={inputId}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        error={error || outOfRange}
        helperText={helperText}
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    </Box>
  );
}

export default LabeledNumberField;
