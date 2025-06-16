import { Box, Typography } from '@mui/material';
import { ProgressSpinner } from '../atoms';

export interface ProgressWithLabelProps {
  /** Porcentaje de avance (0-100). Si se omite, se muestra en modo indeterminado */
  progress?: number;
  /** Texto descriptivo. Si no se indica, se genera automáticamente */
  label?: string;
  /** Orientación del layout */
  orientation?: 'horizontal' | 'vertical';
  /** Tamaño del spinner */
  size?: 'small' | 'large';
  /** Color del spinner */
  color?: 'primary' | 'secondary' | 'inherit' | 'error' | 'info' | 'warning';
}

const SIZE_MAP = { small: 24, large: 64 } as const;

/**
 * Muestra un `ProgressSpinner` acompañado de un texto o porcentaje.
 */
export function ProgressWithLabel({
  progress,
  label,
  orientation = 'horizontal',
  size = 'small',
  color = 'primary',
}: ProgressWithLabelProps) {
  const spinnerSize = SIZE_MAP[size];
  const text =
    label ?? (progress !== undefined ? `${progress}% completado` : 'Cargando...');
  const variant = progress !== undefined ? 'determinate' : 'indeterminate';

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection={orientation === 'vertical' ? 'column' : 'row'}
      gap={1}
    >
      <ProgressSpinner
        variant={variant}
        value={progress}
        size={spinnerSize}
        color={color}
      />
      <Typography aria-live="polite" variant="body2">
        {text}
      </Typography>
    </Box>
  );
}

export default ProgressWithLabel;
