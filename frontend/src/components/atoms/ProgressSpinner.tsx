import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';

export type ProgressSpinnerProps = CircularProgressProps;

/**
 * Indicador de carga circular. Puede usarse en modo determinado
 * pasando `value` y `variant="determinate"` o en modo indeterminado.
 */
export function ProgressSpinner({ color = 'primary', ...props }: ProgressSpinnerProps) {
  return <CircularProgress color={color} {...props} />;
}

export default ProgressSpinner;
