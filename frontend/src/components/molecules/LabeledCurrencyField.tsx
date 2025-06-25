import { Box, Typography } from '@mui/material';
import { useId, useState } from 'react';
import { CurrencyField, CurrencyFieldProps } from '../atoms';

export interface LabeledCurrencyFieldProps extends Omit<CurrencyFieldProps, 'label'> {
  /** Texto de la etiqueta */
  label: string;
}

/**
 * Campo de moneda con etiqueta visible.
 * Combina un `CurrencyField` y un `label` para un formulario accesible.
 */
export function LabeledCurrencyField({
  label,
  id,
  value,
  onChange,
  currency = 'USD',
  locale = 'en-US',
  min,
  max,
  error = false,
  helperText,
  disabled = false,
  onFocus,
  onBlur,
  ...props
}: LabeledCurrencyFieldProps) {
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
      <CurrencyField
        id={inputId}
        value={value}
        onChange={onChange}
        currency={currency}
        locale={locale}
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

export default LabeledCurrencyField;
