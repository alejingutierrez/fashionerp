import { Box } from '@mui/material';
import { useMemo } from 'react';
import { Slider, Chip, SliderProps } from '../atoms';

export interface StockLevelSliderProps
  extends Omit<SliderProps, 'value' | 'onChange' | 'onChangeCommitted' | 'color'> {
  /** Porcentaje actual de stock */
  value: number;
  /** Emite el valor mientras se arrastra */
  onChange: (value: number) => void;
  /** Emite el valor final al soltar */
  onCommit?: (value: number) => void;
  /** Deshabilita la modificaci\u00F3n */
  readOnly?: boolean;
}

const LEVELS = [
  { min: 71, label: 'Alto', color: 'success' },
  { min: 30, label: 'Medio', color: 'warning' },
  { min: 1, label: 'Cr\u00EDtico', color: 'error' },
  { min: 0, label: 'Sin stock', color: 'default' },
] as const;

function getLevel(value: number) {
  for (const level of LEVELS) {
    if (value >= level.min) return level;
  }
  return LEVELS[LEVELS.length - 1];
}

/**
 * Control de stock con retroalimentaci\u00F3n visual y badge de estado.
 */
export function StockLevelSlider({
  value,
  onChange,
  onCommit,
  readOnly = false,
  min = 0,
  max = 100,
  step = 1,
  sx,
  ...rest
}: StockLevelSliderProps) {
  const level = useMemo(() => getLevel(value), [value]);
  const ariaText = `${value} unidades, nivel ${level.label.toLowerCase()}`;

  const handleChange: SliderProps['onChange'] = (_, val) => {
    if (typeof val === 'number') {
      onChange(val);
    }
  };

  const handleCommit: SliderProps['onChangeCommitted'] = (_, val) => {
    if (typeof val === 'number') {
      onCommit?.(val);
    }
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Slider
        value={value}
        onChange={handleChange}
        onChangeCommitted={handleCommit}
        aria-valuetext={ariaText}
        disabled={readOnly}
        min={min}
        max={max}
        step={step}
        color={level.color}
        sx={{ flexGrow: 1, ...sx }}
        {...rest}
      />
      <Chip label={level.label} color={level.color} size="small" />
    </Box>
  );
}

export default StockLevelSlider;
