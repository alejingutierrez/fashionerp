import { ChangeEvent, useState } from 'react';
import { TextField, TextFieldProps } from './TextField';

export interface CurrencyFieldProps
  extends Omit<TextFieldProps, 'type' | 'value' | 'onChange'> {
  /** Valor num\u00E9rico actual */
  value: number | '';
  /** C\u00F3digo de moneda ISO 4217 */
  currency?: string;
  /** Manejador de cambio con el nuevo valor num\u00E9rico o vac\u00EDo */
  onChange: (event: ChangeEvent<HTMLInputElement>, value: number | '') => void;
}

/**
 * Campo de entrada especializado para valores monetarios.
 * Formatea seg\u00FAn la moneda al perder el foco.
 */
export function CurrencyField({
  value,
  onChange,
  currency = 'USD',
  onFocus,
  onBlur,
  inputProps,
  ...props
}: CurrencyFieldProps) {
  const [focused, setFocused] = useState(false);

  const format = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(val);

  const displayValue = value === '' ? '' : focused ? String(value) : format(value);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const sanitized = val.replace(/[^0-9.-]/g, '');
    if (val === sanitized && (sanitized === '' || /^-?\d*(\.\d*)?$/.test(sanitized))) {
      onChange(e, sanitized === '' ? '' : Number(sanitized));
    }
  };

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    setFocused(false);
    onBlur?.(e);
  };

  return (
    <TextField
      {...props}
      type="text"
      value={displayValue}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      inputProps={{ ...inputProps }}
    />
  );
}

export default CurrencyField;
