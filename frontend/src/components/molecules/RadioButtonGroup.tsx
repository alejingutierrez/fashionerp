import { FormControl, FormLabel, RadioGroup, FormControlLabel } from '@mui/material';
import { useId } from 'react';
import { RadioButton } from '../atoms';

export interface RadioButtonOption {
  /** Texto visible de la opción */
  label: string;
  /** Valor asociado a la opción */
  value: string | number;
  /** Deshabilita esta opción individual */
  disabled?: boolean;
}

export interface RadioButtonGroupProps {
  /** Título del grupo de opciones */
  label?: string;
  /** Opciones disponibles para seleccionar */
  options: RadioButtonOption[];
  /** Valor seleccionado actualmente */
  value: string | number;
  /** Manejador de cambio */
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string | number,
  ) => void;
  /** Orientación del grupo */
  orientation?: 'vertical' | 'horizontal';
  /** Deshabilita todo el grupo */
  disabled?: boolean;
  /** Nombre del grupo; si se omite se genera uno */
  name?: string;
}

/**
 * Conjunto exclusivo de `RadioButton` con una etiqueta opcional.
 */
export function RadioButtonGroup({
  label,
  options,
  value,
  onChange,
  orientation = 'vertical',
  disabled = false,
  name,
}: RadioButtonGroupProps) {
  const generatedName = useId();
  return (
    <FormControl component="fieldset" disabled={disabled}>
      {label && <FormLabel>{label}</FormLabel>}
      <RadioGroup
        name={name ?? generatedName}
        value={value}
        onChange={onChange}
        row={orientation === 'horizontal'}
      >
        {options.map((opt) => (
          <FormControlLabel
            key={opt.value}
            value={opt.value}
            control={<RadioButton />}
            label={opt.label}
            disabled={opt.disabled}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default RadioButtonGroup;
