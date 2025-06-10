import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  SelectChangeEvent,
  FormHelperText,
  SelectProps as MuiSelectProps,
} from '@mui/material';
import { useId, ReactNode } from 'react';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<MuiSelectProps, 'onChange' | 'value'> {
  /** Etiqueta del campo. */
  label?: string;
  /** Opciones a mostrar en el menú desplegable. */
  options: SelectOption[];
  /** Valor seleccionado. */
  value: string | number;
  /** Manejador al cambiar la selección. */
  onChange: (
    event: SelectChangeEvent<string | number>,
    child: ReactNode,
  ) => void;
  /** Mensaje de ayuda o error. */
  helperText?: ReactNode;
}

/**
 * Lista desplegable basada en MUI `Select`.
 */
export function Select({
  label,
  options,
  value,
  onChange,
  error = false,
  disabled = false,
  helperText,
  ...props
}: SelectProps) {
  const labelId = useId();

  return (
    <FormControl
      fullWidth
      variant="outlined"
      disabled={disabled}
      error={error}
    >
      {label && <InputLabel id={labelId}>{label}</InputLabel>}
      <MuiSelect
        labelId={labelId}
        label={label}
        value={value}
        onChange={onChange}
        {...props}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

export default Select;
