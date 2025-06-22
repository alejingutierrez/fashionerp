import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box } from '@mui/material';
import { keyframes } from '@emotion/react';
import { useRef, useEffect, useState } from 'react';
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
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (!disabled) {
      setAnimate(true);
      const t = setTimeout(() => setAnimate(false), 200);
      return () => clearTimeout(t);
    }
    return () => {};
  }, [value, disabled]);

  const bounce = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.15); }
    100% { transform: scale(1); }
  `;
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

  const timer = useRef<NodeJS.Timeout>();
  const delay = useRef(500);
  const action = useRef<() => void>();

  const stepHold = () => {
    action.current?.();
    delay.current = Math.max(50, delay.current * 0.75);
    timer.current = setTimeout(stepHold, delay.current);
  };

  const startHold = (fn: () => void) => {
    if (disabled) return;
    action.current = fn;
    fn();
    delay.current = 500;
    timer.current = setTimeout(stepHold, delay.current);
  };

  const stopHold = () => {
    if (timer.current) clearTimeout(timer.current);
    action.current = undefined;
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <IconButton
        aria-label="decrement"
        icon={<RemoveIcon />}
        onClick={decrement}
        onMouseDown={() => startHold(decrement)}
        onMouseUp={stopHold}
        onMouseLeave={stopHold}
        onTouchStart={() => startHold(decrement)}
        onTouchEnd={stopHold}
        disabled={disableDec}
        size={size}
        sx={{
          width: 32,
          height: 32,
          touchAction: 'none',
          '@media (pointer: coarse)': {
            width: 44,
            height: 44,
          },
          borderRadius: '50%',
          border: '1px solid #DDD',
          color: '#333',
          opacity: disableDec ? 0.4 : 1,
          cursor: disableDec ? 'not-allowed' : 'pointer',
          '&:hover:not(:disabled), &:focus-visible': {
            boxShadow: '0 0 0 2px #FF7900',
          },
        }}
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
        inputProps={{ 'aria-label': 'current value' }}
        sx={{
          width: size === 'small' ? 72 : 96,
          animation: animate ? `${bounce} 200ms ease` : undefined,
          '& .MuiInputBase-input': {
            textAlign: 'center',
            fontWeight: 600,
            fontSize: 16,
          },
        }}
      />
      <IconButton
        aria-label="increment"
        icon={<AddIcon />}
        onClick={increment}
        onMouseDown={() => startHold(increment)}
        onMouseUp={stopHold}
        onMouseLeave={stopHold}
        onTouchStart={() => startHold(increment)}
        onTouchEnd={stopHold}
        disabled={disableInc}
        size={size}
        sx={{
          width: 32,
          height: 32,
          touchAction: 'none',
          '@media (pointer: coarse)': {
            width: 44,
            height: 44,
          },
          borderRadius: '50%',
          border: '1px solid #DDD',
          color: '#333',
          opacity: disableInc ? 0.4 : 1,
          cursor: disableInc ? 'not-allowed' : 'pointer',
          '&:hover:not(:disabled), &:focus-visible': {
            boxShadow: '0 0 0 2px #FF7900',
          },
        }}
      />
    </Box>
  );
}

export default NumberStepper;
