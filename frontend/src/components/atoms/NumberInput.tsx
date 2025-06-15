import { ChangeEvent } from 'react';
import { TextField, TextFieldProps } from './TextField';

export interface NumberInputProps
  extends Omit<TextFieldProps, 'type' | 'value' | 'onChange'> {
  /** Valor num\u00E9rico actual */
  value: number | '';
  /** Manejador de cambio con el nuevo valor num\u00E9rico o vac\u00EDo */
  onChange: (event: ChangeEvent<HTMLInputElement>, value: number | '') => void;
}

/**
 * Campo de entrada especializado para n\u00FAmeros.
 * Rechaza caracteres no num\u00E9ricos.
 */
export function NumberInput({
  value,
  onChange,
  inputProps,
  ...props
}: NumberInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || /^-?\d*(\.\d*)?$/.test(val)) {
      onChange(e, val === '' ? '' : Number(val));
    }
  };

  return (
    <TextField
      {...props}
      type="number"
      value={value}
      onChange={handleChange}
      inputProps={{ ...inputProps }}
    />
  );
}

export default NumberInput;
