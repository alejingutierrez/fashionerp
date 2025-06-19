import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Typography } from '@mui/material';
import { IconButton, NumberInput, NumberInputProps, Tooltip } from '../atoms';

export interface PriceStepperProps extends Pick<NumberInputProps, 'size'> {
  /** Valor actual del precio */
  value: number;
  /** Callback con el nuevo precio */
  onChange: (value: number) => void;
  /** Valor mínimo permitido */
  min?: number;
  /** Valor máximo permitido */
  max?: number;
  /** Incremento/decremento en cada paso */
  step?: number;
  /** Deshabilita la interacción */
  disabled?: boolean;
  /** Solo lectura, sin editar */
  readOnly?: boolean;
}

function clamp(value: number, min?: number, max?: number) {
  if (min !== undefined) value = Math.max(min, value);
  if (max !== undefined) value = Math.min(max, value);
  return value;
}

const srOnly = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  border: 0,
} as const;

/**
 * Ajuste fino de precio con controles de incremento y decremento.
 */
export function PriceStepper({
  value,
  onChange,
  min,
  max,
  step = 0.01,
  disabled = false,
  readOnly = false,
  size = 'medium',
}: PriceStepperProps) {
  const handleInputChange: NumberInputProps['onChange'] = (_, val) => {
    if (val === '') return;
    onChange(clamp(Number(val.toFixed(2)), min, max));
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    const numeric = Number(e.target.value);
    const normalized = clamp(numeric, min, max);
    if (numeric !== normalized) {
      onChange(normalized);
    }
  };

  const increment = () => {
    const next = clamp(parseFloat((value + step).toFixed(2)), min, max);
    if (next !== value) {
      onChange(next);
    }
  };

  const decrement = () => {
    const next = clamp(parseFloat((value - step).toFixed(2)), min, max);
    if (next !== value) {
      onChange(next);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      increment();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      decrement();
    }
  };

  const atMin = min !== undefined && value <= min;
  const atMax = max !== undefined && value >= max;
  const disableDec = disabled || readOnly || atMin;
  const disableInc = disabled || readOnly || atMax;

  const tooltipDec =
    atMin && !disabled && !readOnly ? 'Llegaste al m\u00EDnimo' : 'Disminuir \u2193';
  const tooltipInc =
    atMax && !disabled && !readOnly ? 'Llegaste al m\u00E1ximo' : 'Aumentar \u2191';

  const valueStr = value.toFixed(2);
  const inputWidth = `calc(${valueStr.length + 2}ch)`;

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      sx={{ opacity: disabled ? 0.4 : 1, width: 'fit-content', minWidth: 84 }}
    >
      <Tooltip title={tooltipDec}>
        <span>
          <IconButton
            aria-label="decrementar"
            icon={<RemoveIcon />}
            onClick={decrement}
            disabled={disableDec}
            size={size}
          />
        </span>
      </Tooltip>
      <NumberInput
        value={Number(value.toFixed(2))}
        onChange={handleInputChange}
        onBlur={handleBlur}
        disabled={disabled || readOnly}
        min={min}
        max={max}
        size={size}
        fullWidth={false}
        inputProps={{
          'aria-label': 'valor actual',
          onKeyDown: handleKeyDown,
          readOnly,
          style: { textAlign: 'center' },
        }}
        sx={{ width: inputWidth }}
      />
      <Tooltip title={tooltipInc}>
        <span>
          <IconButton
            aria-label="incrementar"
            icon={<AddIcon />}
            onClick={increment}
            disabled={disableInc}
            size={size}
          />
        </span>
      </Tooltip>
      <Typography sx={srOnly} aria-live="polite">
        {value.toFixed(2)}
      </Typography>
    </Box>
  );
}

export default PriceStepper;
