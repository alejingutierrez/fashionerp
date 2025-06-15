import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box } from '@mui/material';
import { IconButton, NumberInput, NumberInputProps } from '../atoms';

export interface NumberStepperProps extends Pick<NumberInputProps, 'size'> {
  /** Valor numérico actual */
  value: number;
  /** Manejador de cambio con el nuevo valor */
  onChange: (value: number) => void;
  /** Valor mínimo permitido */
  min?: number;
  /** Valor máximo permitido */
  max?: number;
  /** Incremento/decremento por paso */
  step?: number;
  /** Deshabilita toda la interacción */
  disabled?: boolean;
}

function clamp(value: number, min?: number, max?: number) {
  if (min !== undefined) value = Math.max(min, value);
  if (max !== undefined) value = Math.min(max, value);
  return value;
}

/**
 * Selector numérico con botones para aumentar o disminuir el valor.
 */
export function NumberStepper({
  value,
  onChange,
  min,
  max,
  step = 1,
  disabled = false,
  size = 'medium',
}: NumberStepperProps) {
  const handleInputChange: NumberInputProps['onChange'] = (_, val) => {
    if (val === '') return;
    onChange(clamp(val, min, max));
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    const numeric = Number(e.target.value);
    const normalized = clamp(numeric, min, max);
    if (numeric !== normalized) {
      onChange(normalized);
    }
  };

  const increment = () => {
    const next = clamp(value + step, min, max);
    if (next !== value) {
      onChange(next);
    }
  };

  const decrement = () => {
    const next = clamp(value - step, min, max);
    if (next !== value) {
      onChange(next);
    }
  };

  const disableDec = disabled || (min !== undefined && value <= min);
  const disableInc = disabled || (max !== undefined && value >= max);

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <IconButton
        aria-label="decrement"
        icon={<RemoveIcon />}
        onClick={decrement}
        disabled={disableDec}
        size={size}
      />
      <NumberInput
        value={value}
        onChange={handleInputChange}
        onBlur={handleBlur}
        disabled={disabled}
        min={min}
        max={max}
        size={size}
        fullWidth={false}
        inputProps={{ 'aria-label': 'current value', style: { textAlign: 'center' } }}
        sx={{ width: size === 'small' ? 72 : 96 }}
      />
      <IconButton
        aria-label="increment"
        icon={<AddIcon />}
        onClick={increment}
        disabled={disableInc}
        size={size}
      />
    </Box>
  );
}

export default NumberStepper;
